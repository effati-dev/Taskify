import type { FastifyInstance } from "fastify";
import userController from "./user.controller";
import { userRequestSchemas } from "./schemas/request";
import { userResponseSchemas } from "./schemas/response";
import { userParamSchemas } from "./schemas/params";
import { userQuerySchemas } from "./schemas/query";

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
    onRequest: app.authenticate,
    method: "GET",
    schema: {
      querystring: userQuerySchemas.getManyUsers,
      response: { 200: userResponseSchemas.getManyUsers },
    },
    handler: userController.getAllUsersHandler,
  });

  app.route({
    url: "/:userId",
    method: "GET",
    onRequest: app.authenticate,
    schema: {
      params: userParamSchemas.getUserById,
      response: { 200: userResponseSchemas.getUser },
    },
    handler: userController.getUserByIdHandler,
  });

  app.route({
    url: "/:userId",
    method: "PUT",
    onRequest: app.authenticate,
    schema: {
      params: userParamSchemas.getUserById,
      body: userRequestSchemas.updateUser,
      response: { 200: userResponseSchemas.getUser },
    },
    handler: userController.updateUserHandler,
  });

  app.route({
    url: "/:userId/change-password",
    method: "PUT",
    onRequest: app.authenticate,
    schema: {
      params: userParamSchemas.getUserById,
      body: userRequestSchemas.changePassword,
      response: { 200: userResponseSchemas.getUser },
    },
    handler: userController.changePasswordHandler,
  });
};
