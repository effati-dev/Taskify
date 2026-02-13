import type { FastifyInstance } from "fastify";
import taskController from "./task.controller";
import { taskRequestSchemas } from "./schemas/request";
import { taskResponseSchemas } from "./schemas/response";
import { taskParamSchemas } from "./schemas/params";

export default (app: FastifyInstance) => {
  app.route({
    url: "/",
    method: "POST",
    schema: {
      body: taskRequestSchemas.createTask,
      response: { 201: taskResponseSchemas.getTask },
    },
    onRequest: app.authenticate,
    handler: taskController.createHandler,
  });

  app.route({
    url: "/",
    method: "GET",
    schema: {
      response: { 200: taskResponseSchemas.getManyTasks },
    },
    onRequest: app.authenticate,
    handler: taskController.getUserAllTasksHandler,
  });

  app.route({
    url: "/:taskId",
    method: "GET",
    schema: {
      params: taskParamSchemas.getTaskById,
      response: { 200: taskResponseSchemas.getTask },
    },
    onRequest: app.authenticate,
    handler: taskController.getUserTaskHandler,
  });

  app.route({
    url: "/:taskId",
    method: "PUT",
    schema: {
      params: taskParamSchemas.getTaskById,
      body: taskRequestSchemas.upadteTask,
      response: { 200: taskResponseSchemas.getTask },
    },
    onRequest: app.authenticate,
    handler: taskController.updateTask,
  });

  app.route({
    url: "/:taskId",
    method: "DELETE",
    schema: {
      params: taskParamSchemas.getTaskById,
    },
    onRequest: app.authenticate,
    handler: taskController.deleteTask,
  });
};
