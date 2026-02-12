import type { FastifyReply, FastifyRequest } from "fastify";
import authService from "./auth.service";
import type { LoginRequest } from "./schemas/request";
import env from "../../env";
import { AppError } from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import userService from "../users/user.service";

export default {
  loginHandler: async (
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const user = await authService.login(body);
    const { accessToken, refreshToken } = authService.signTokens(user);
    reply.setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return reply.status(200).send({ accessToken });
  },

  refreshHandler: async (request: FastifyRequest, reply: FastifyReply) => {
    const refresh = (await request.jwtVerify({ onlyCookie: true })) as Record<
      string,
      any
    >;

    if (refresh.type !== "refresh")
      throw new AppError(
        401,
        errorCodes.UNAUTHORIZED,
        "Unauthorized",
        "Invalid Refresh Token",
      );
    const user = await userService.getUserById({ userId: refresh.id });
    const { accessToken, refreshToken } = authService.signTokens(user);
    reply.setCookie("refreshToken", refreshToken);
    return reply.status(200).send({ accessToken });
  },
};
