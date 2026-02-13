import type { FastifyInstance } from "fastify";
import taskController from "./task.controller";
import { taskRequestSchemas } from "./schemas/request";
import { taskResponseSchemas } from "./schemas/response";

export default (app: FastifyInstance) => {
  app.route({
    url: "/",
    method: "POST",
    schema: {
      body: taskRequestSchemas.createTask,
      response: { 200: taskResponseSchemas.getTask },
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
      params: taskRequestSchemas.getTaskById,
      response: { 200: taskResponseSchemas.getTask },
    },
    onRequest: app.authenticate,
    handler: taskController.getUserTaskHandler,
  });
};
