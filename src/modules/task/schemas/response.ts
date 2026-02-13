import { z } from "zod/v4";
import { taskCore } from "./core";

export const taskResponseSchemas = {
  getTask: z.object({
    id: taskCore.id,
    title: taskCore.title,
    description: taskCore.description.optional().nullable(),
    status: taskCore.status,
    userId: taskCore.userId,
    createdAt: taskCore.createdAt,
  }),

  getManyTasks: z.array(
    z.object({
      id: taskCore.id,
      title: taskCore.title,
      description: taskCore.description,
      createdAt: taskCore.createdAt,
    }),
  ),
};
