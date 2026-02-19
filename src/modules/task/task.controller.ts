import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreateTask, UpdateTask } from "./schemas/request";
import taskService from "./task.service";
import type { GetTaskById } from "./schemas/params";
import type { GetManyTasksQuery } from "./schemas/query";

export default {
  createHandler: async (
    request: FastifyRequest<{ Body: CreateTask }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const userId = (request.user as Record<string, any>).id;
    const task = await taskService.createTask(userId, body);
    return reply.status(201).send({ data: task });
  },

  getUserAllTasksHandler: async (
    request: FastifyRequest<{ Querystring: GetManyTasksQuery }>,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const tasks = await taskService.getAllTasks(userId, request.query);
    return reply.status(200).send({ data: tasks });
  },

  getUserTaskHandler: async (
    request: FastifyRequest<{ Params: GetTaskById }>,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const taskId = request.params.taskId;
    const task = await taskService.getTask(userId, taskId);
    return reply.status(200).send({ data: task });
  },

  updateTask: async (
    request: FastifyRequest<{ Body: UpdateTask; Params: GetTaskById }>,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const taskId = request.params.taskId;
    const body = request.body;
    const task = await taskService.updateTask(userId, taskId, body);
    return reply.status(200).send({ data: task });
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
