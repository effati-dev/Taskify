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
    method: "GET",
    schema: {
      security: [{ bearerAuth: [] }],
      querystring: userQuerySchemas.getManyUsers,
      response: { 200: userResponseSchemas.getManyUsers },
    },
    onRequest: [app.authenticate, app.authorize(["admin"])],
    handler: userController.getAllUsersHandler,
  });

  app.route({
    url: "/:userId",
    method: "GET",
    schema: {
      security: [{ bearerAuth: [] }],
      params: userParamSchemas.getUserById,
      response: { 200: userResponseSchemas.getUser },
    },
    onRequest: [app.authenticate, app.authorize(["admin"])],
    handler: userController.getUserByIdHandler,
  });

  app.route({
    url: "/:userId",
    method: "PUT",
    schema: {
      security: [{ bearerAuth: [] }],
      params: userParamSchemas.getUserById,
      body: userRequestSchemas.updateUser,
      response: { 200: userResponseSchemas.getUser },
    },
    onRequest: [app.authenticate, app.authorize(["admin"])],
    handler: userController.updateUserHandler,
  });

  app.route({
    url: "/:userId/change-password",
    method: "PUT",
    schema: {
      security: [{ bearerAuth: [] }],
      params: userParamSchemas.getUserById,
      body: userRequestSchemas.changePassword,
      response: { 200: userResponseSchemas.getUser },
    },
    onRequest: [app.authenticate, app.authorize(["admin"])],
    handler: userController.changePasswordHandler,
  });

  app.route({
    url: "/me",
    method: "GET",
    schema: {
      security: [{ bearerAuth: [] }],
      response: { 200: userResponseSchemas.getUser },
    },
    onRequest: app.authenticate,
    handler: userController.meHandler,
  });

  app.route({
    url: "/me",
    method: "PUT",
    schema: {
      security: [{ bearerAuth: [] }],
      body: userRequestSchemas.updateUser,
      response: { 200: userResponseSchemas.getUser },
    },
    onRequest: app.authenticate,
    handler: userController.updateMeHandler,
  });

  app.route({
    url: "/me/change-password",
    method: "PUT",
    schema: {
      security: [{ bearerAuth: [] }],
      body: userRequestSchemas.changePassword,
      response: { 200: userResponseSchemas.getUser },
    },
    onRequest: app.authenticate,
    handler: userController.changeMyPasswordHandler,
  });
};
