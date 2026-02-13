import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateTask, GetTaskById } from "./schemas/request";
import taskService from "./task.service";
import type { UpdateTask } from "./task.dto";

export default {
  createHandler: async (
    request: FastifyRequest<{ Body: CreateTask }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const userId = (request.user as Record<string, any>).id;
    const task = await taskService.createTask(userId, body);
    return reply.status(201).send(task);
  },

  getUserAllTasksHandler: async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const tasks = await taskService.getAllTasks(userId);
    return reply.status(200).send(tasks);
  },

  getUserTaskHandler: async (
    request: FastifyRequest<{ Params: GetTaskById }>,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const taskId = request.params.taskId;
    const task = await taskService.getTask(userId, taskId);
    return reply.status(200).send(task);
  },

  updateTask: async (
    request: FastifyRequest<{ Body: UpdateTask; Params: GetTaskById }>,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const taskId = request.params.taskId;
    const body = request.body;
    const task = await taskService.updateTask(userId, taskId, body);
    return reply.status(200).send(task);
  },

  deleteTask: async (
    request: FastifyRequest<{ Params: GetTaskById }>,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const taskId = request.params.taskId;
    await taskService.deleteTask(userId, taskId);
    return reply.status(204).send();
  },
};
