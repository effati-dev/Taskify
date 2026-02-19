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
      body: authRequestSchemas.login,
      response: { 200: authResponseSchemas.login },
    },
    handler: authController.loginHandler,
  });

  app.route({
    url: "/refresh-token",
    method: "POST",
    schema: { response: { 200: authResponseSchemas.login } },
    handler: authController.refreshHandler,
  });

  app.route({
    url: "/logout",
    method: "GET",
    schema: {
      security: [{ bearerAuth: [] }],
      response: { 204: nullSchema },
    },
    onRequest: app.authenticate,
    handler: authController.logoutHandler,
  });
};
