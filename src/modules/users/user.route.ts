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
      tags: ["Users"],
      summary: "Register new user",
      body: userRequestSchemas.registerUser,
      response: { 201: userResponseSchemas.getUser },
    },
    handler: userController.registerUserHandler,
  });

  app.route({
    url: "/",
    method: "GET",
    schema: {
      tags: ["Users"],
      summary: "Get all users",
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
      tags: ["Users"],
      summary: "Get a single user",
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
      tags: ["Users"],
      summary: "Update a single user",
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
      tags: ["Users"],
      summary: "Change a single user's password",
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
      tags: ["Users"],
      summary: "Get user's himself (by id in access token)",
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
      tags: ["Users"],
      summary: "Update user's himself (by id in access token)",
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
      tags: ["Users"],
      summary: "Change user's own password (by id in access token)",
      security: [{ bearerAuth: [] }],
      body: userRequestSchemas.changePassword,
      response: { 200: userResponseSchemas.getUser },
    },
    onRequest: app.authenticate,
    handler: userController.changeMyPasswordHandler,
  });
};
