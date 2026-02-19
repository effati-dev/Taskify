import { omitUndefined, prisma } from "../../data/prisma";
import { AppError } from "../../errors/AppError";
import type {
  TaskOrderByWithRelationInput,
  TaskWhereInput,
} from "../../generated/prisma/models";
import { buildPagination } from "../../utils/pagination";
import { buildOrderBy } from "../../utils/sort";
import type {
  CreateTaskDTO,
  GetAllTasksQueryDTO,
  UpdateTaskDTO,
} from "./task.dto";

export default {
  createTask: async (userId: string, input: CreateTaskDTO) => {
    return prisma.task.create({ data: { ...omitUndefined(input), userId } });
  },

  getAllTasks: async (userId: string, query: GetAllTasksQueryDTO) => {
    const { skip, take } = buildPagination(query.page, query.limit);
    const status = query.status;

    // Use search field to search in name
    // Use status field to find requested status
    // The result owner must be logged in user
    const where: TaskWhereInput = {
      userId,
      ...(query.status && { status: query.status }),
      ...(query.search && {
        OR: [
          {
            title: {
              contains: query.search,
              mode: "insensitive",
            },
          },
        ],
      }),
    };
    const orderBy = buildOrderBy<TaskOrderByWithRelationInput>(query.sort, {
      createdAt: "desc",
    });

    return prisma.task.findMany({ skip, take, where, orderBy });
  },

  getTask: async (userId: string, taskId: string) => {
    const task = await prisma.task.findUniqueOrThrow({ where: { id: taskId } });
    if (task.userId !== userId)
      throw new AppError(403, "FORBIDDEN", "Forbidden", "Access denied.");
    return task;
  },

  updateTask: async (userId: string, taskId: string, input: UpdateTaskDTO) => {
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
