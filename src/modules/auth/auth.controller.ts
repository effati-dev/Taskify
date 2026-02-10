import type { FastifyReply, FastifyRequest } from "fastify";
import authService from "./auth.service";
import type { LoginRequest } from "./schemas/request";
import env from "../../env";

export default {
  loginHandler: async (
    request: FastifyRequest<{ Body: LoginRequest }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const { accessToken, refreshToken } = await authService.login(body);
    reply.setCookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return reply.status(200).send({ accessToken });
  },
};
