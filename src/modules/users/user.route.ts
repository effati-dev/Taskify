import type { FastifyInstance } from "fastify";
import {
  registerUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  changePasswordHandler,
} from "./user.controller";
import {
  changePasswordRequestSchema,
  getUserRequestSchema,
  registerUserRequestSchema,
  updateUserRequestSchema,
} from "./schemas/request";
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

  app.route({
    url: "/:userId",
    method: "GET",
    schema: {
      params: getUserRequestSchema,
      response: { 200: getUserResponseSchema },
    },
    handler: getUserByIdHandler,
  });

  app.route({
    url: "/:userId",
    method: "PUT",
    schema: {
      params: getUserRequestSchema,
      body: updateUserRequestSchema,
      response: { 200: getUserResponseSchema },
    },
    handler: updateUserHandler,
  });

  app.route({
    url: "/:userId/change-password",
    method: "PUT",
    schema: {
      params: getUserRequestSchema,
      body: changePasswordRequestSchema,
      response: { 200: getUserResponseSchema },
    },
    handler: changePasswordHandler,
  });
};
