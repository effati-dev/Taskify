import type { FastifyInstance } from "fastify";
import authController from "./auth.controller";
import { authRequestSchemas } from "./schemas/request";
import { authResponseSchemas } from "./schemas/response";
import { nullSchema } from "../../common/schema";

export default (app: FastifyInstance) => {
  app.route({
    url: "/login",
    method: "POST",
    schema: {
      tags: ["Auth"],
      summary: "Login with email and password",
      body: authRequestSchemas.login,
      response: { 200: authResponseSchemas.login },
    },
    handler: authController.loginHandler,
  });

  app.route({
    url: "/refresh-token",
    method: "POST",
    schema: {
      tags: ["Auth"],
      summary: "Refresh both tokens",
      response: { 200: authResponseSchemas.login },
    },
    handler: authController.refreshHandler,
  });

  app.route({
    url: "/logout",
    method: "GET",
    schema: {
      tags: ["Auth"],
      summary: "Delete refresh token from cookie",
      security: [{ bearerAuth: [] }],
      response: { 204: nullSchema },
    },
    onRequest: app.authenticate,
    handler: authController.logoutHandler,
  });
};
