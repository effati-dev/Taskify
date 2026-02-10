import type { FastifyInstance } from "fastify";
import userController from "./user.controller";
import { userRequestSchemas } from "./schemas/request";
import { userResponseSchemas } from "./schemas/response";

export default (app: FastifyInstance) => {
  app.route({
    url: "/",
    method: "POST",
    schema: {
      body: userRequestSchemas.registerUser,
      response: { 201: userResponseSchemas.getUser },
    },
    handler: userController.registerUserHandler,
  });

  app.route({
    url: "/",
    method: "GET",
    schema: { response: { 200: userResponseSchemas.getManyUsers } },
    handler: userController.getAllUsersHandler,
  });

  app.route({
    url: "/:userId",
    method: "GET",
    schema: {
      params: userRequestSchemas.getUser,
      response: { 200: userResponseSchemas.getUser },
    },
    handler: userController.getUserByIdHandler,
  });

  app.route({
    url: "/:userId",
    method: "PUT",
    schema: {
      params: userRequestSchemas.getUser,
      body: userRequestSchemas.updateUser,
      response: { 200: userResponseSchemas.getUser },
    },
    handler: userController.updateUserHandler,
  });

  app.route({
    url: "/:userId/change-password",
    method: "PUT",
    schema: {
      params: userRequestSchemas.getUser,
      body: userRequestSchemas.changePassword,
      response: { 200: userResponseSchemas.getUser },
    },
    handler: userController.changePasswordHandler,
  });
};
