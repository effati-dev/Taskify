import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateTask } from "./schemas/request";
import taskService from "./task.service";

export default {
  createHandler: async (
    request: FastifyRequest<{ Body: CreateTask }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const userId = (request.user as Record<string, any>).id;
    const task = await taskService.createTask(userId, body);
    console.log(task);
    return reply.status(200).send(task);
  },
};
