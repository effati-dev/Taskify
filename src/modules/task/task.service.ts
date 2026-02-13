import { omitUndefined, prisma } from "../../data/prisma";
import { AppError } from "../../errors/AppError";
import type { createTask } from "./task.dto";

export default {
  createTask: async (userId: string, input: createTask) => {
    return prisma.task.create({ data: { ...omitUndefined(input), userId } });
  },

  getUserAllTasks: async (userId: string) => {
    return prisma.task.findMany({ where: { userId } });
  },

  getUserTask: async (userId: string, taskId: string) => {
    const task = await prisma.task.findUniqueOrThrow({ where: { id: taskId } });
    if (task.userId !== userId)
      throw new AppError(403, "FORBIDDEN", "Forbidden", "Access denied.");
    return task;
  },
};
