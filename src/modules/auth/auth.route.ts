import type { FastifyInstance } from "fastify";
import authController from "./auth.controller";
import { authRequestSchemas } from "./schemas/request";
import { authResponseSchemas } from "./schemas/response";

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
    url: "/refresh",
    method: "POST",
    handler: authController.refreshHandler,
  });
};
