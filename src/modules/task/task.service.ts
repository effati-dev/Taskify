import { omitUndefined, prisma } from "../../data/prisma";
import { AppError } from "../../errors/AppError";
import type { CreateTask, UpdateTask } from "./task.dto";

export default {
  createTask: async (userId: string, input: CreateTask) => {
    return prisma.task.create({ data: { ...omitUndefined(input), userId } });
  },

  getAllTasks: async (userId: string) => {
    return prisma.task.findMany({ where: { userId } });
  },

  getTask: async (userId: string, taskId: string) => {
    const task = await prisma.task.findUniqueOrThrow({ where: { id: taskId } });
    if (task.userId !== userId)
      throw new AppError(403, "FORBIDDEN", "Forbidden", "Access denied.");
    return task;
  },

  updateTask: async (userId: string, taskId: string, input: UpdateTask) => {
    const task = await prisma.task.findUniqueOrThrow({ where: { id: taskId } });
    if (task.userId !== userId)
      throw new AppError(403, "FORBIDDEN", "Forbidden", "Access denied.");
    return prisma.task.update({
      where: { id: taskId },
      data: omitUndefined(input),
    });
  },

  deleteTask: async (userId: string, taskId: string) => {
    const task = await prisma.task.findUniqueOrThrow({ where: { id: taskId } });
    if (task.userId !== userId)
      throw new AppError(403, "FORBIDDEN", "Forbidden", "Access denied.");
    return prisma.task.delete({ where: { id: taskId } });
  },
};
