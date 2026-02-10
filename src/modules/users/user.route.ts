import type { FastifyInstance } from "fastify";
import { registerUserHandler, getAllUsersHandler } from "./user.controller";
import { registerUserRequestSchema } from "./schemas/request";
import {
  getManyUserResponseSchema,
  getUserResponseSchema,
} from "./schemas/response";

export default (app: FastifyInstance) => {
  app.route({
    url: "/",
    method: "POST",
    schema: {
      body: registerUserRequestSchema,
      response: { 201: { getUserResponseSchema } },
    },
    handler: registerUserHandler,
  });

  app.route({
    url: "/",
    method: "GET",
    schema: { response: { 200: getManyUserResponseSchema } },
    handler: getAllUsersHandler,
  });
};
