import type { FastifyReply, FastifyRequest } from "fastify";
import authService from "./auth.service";
import type { LoginRequest } from "./schemas/request";
import env from "../../env";
import { AppError } from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import userService from "../users/user.service";
import type { User, Role } from "../../generated/prisma/client";

export default {
  loginHandler: async function (
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply,
  ) {
    const body = request.body;
    const user = await authService.verifyLogin(body);
    const { accessToken, refreshToken } = await signTokens(reply, user);

    setRefreshToken(reply, refreshToken);
    return reply.status(200).send({ data: { accessToken, user } });
  },

  refreshHandler: async function (
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const refreshTokenData = (await request.refreshJwtVerify({
      onlyCookie: true,
    })) as Record<string, any>;

    if (refreshTokenData.type !== "refresh")
      throw new AppError(
        401,
        errorCodes.UNAUTHORIZED,
        "Unauthorized",
        "Invalid Refresh Token",
      );
    const user = await userService.getUserById(refreshTokenData.userId);
    const { accessToken, refreshToken } = await signTokens(reply, user);
    setRefreshToken(reply, refreshToken);
    return reply.status(200).send({ data: { accessToken, user } });
  },

  logoutHandler: function (_request: FastifyRequest, reply: FastifyReply) {
    reply.clearCookie("refreshToken");
    return reply.status(204).send();
  },
};

async function signTokens(reply: FastifyReply, user: User) {
  const { id, roleId } = user;
  const accessToken = await reply.accessJwtSign(
    { user: { id, roleId }, type: "access" },
    { expiresIn: "15m" },
  );
  const refreshToken = await reply.refreshJwtSign(
    { userId: id, type: "refresh" },
    { expiresIn: "7d" },
  );
  return { accessToken, refreshToken };
}

function setRefreshToken(reply: FastifyReply, refreshToken: string) {
  reply.setCookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });
}
