import type { FastifyReply, FastifyRequest } from "fastify";
import authService from "./auth.service";
import type { LoginRequest } from "./schemas/request";
import env from "../../env";
import { AppError } from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import userService from "../users/user.service";
import type { Prisma, User } from "../../generated/prisma/client";

export default {
  loginHandler: async (
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const user = await authService.verifyLogin(body);
    const { accessToken, refreshToken } = await signTokens(reply, user);

    setRefreshToken(reply, refreshToken);
    return reply.status(200).send({ accessToken, user });
  },

  refreshHandler: async (request: FastifyRequest, reply: FastifyReply) => {
    const refresh = (await request.refreshJwtVerify({
      onlyCookie: true,
    })) as Record<string, any>;

    if (refresh.type !== "refresh")
      throw new AppError(
        401,
        errorCodes.UNAUTHORIZED,
        "Unauthorized",
        "Invalid Refresh Token",
      );
    const user = await userService.getUserById({ userId: refresh.id });
    const { accessToken, refreshToken } = await signTokens(reply, user);
    setRefreshToken(reply, refreshToken);
    return reply.status(200).send({ accessToken, user });
  },
  logoutHandler: (_request: FastifyRequest, reply: FastifyReply) => {
    reply.clearCookie("refreshToken");
    return reply.status(204).send();
  },
  meHandler: async (request: FastifyRequest, reply: FastifyReply) => {
    const accessData = (await request.accessJwtDecode()) as Record<string, any>;
    const user = await userService.getUserById({ userId: accessData.id });
    return reply.status(200).send(user);
  },
};

const signTokens = async (reply: FastifyReply, user: User) => {
  const { id, email, name } = user;
  const accessToken = await reply.accessJwtSign(
    { id, email, name, type: "access" },
    { expiresIn: "15m" },
  );
  const refreshToken = await reply.refreshJwtSign(
    { id, email, name, type: "refresh" },
    { expiresIn: "7d" },
  );
  return { accessToken, refreshToken };
};

const setRefreshToken = (reply: FastifyReply, refreshToken: string) => {
  reply.setCookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
};
