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
};
