import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateTask, GetTaskById } from "./schemas/request";
import taskService from "./task.service";

export default {
  createHandler: async (
    request: FastifyRequest<{ Body: CreateTask }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const userId = (request.user as Record<string, any>).id;
    const task = await taskService.createTask(userId, body);
    return reply.status(200).send(task);
  },

  getUserAllTasksHandler: async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const tasks = await taskService.getUserAllTasks(userId);
    return reply.status(200).send(tasks);
  },

  getUserTaskHandler: async (
    request: FastifyRequest<{ Params: GetTaskById }>,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const taskId = request.params.taskId;
    const task = await taskService.getUserTask(userId, taskId);
    return reply.status(200).send(task);
  },
};
