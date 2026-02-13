import { z } from "zod/v4";
import { taskCore } from "./core";

export const taskRequestSchemas = {
  createTask: z.object({
    title: taskCore.title,
    description: taskCore.description.optional(),
    status: taskCore.status,
  }),

  getTaskById: z.object({
    taskId: taskCore.id,
  }),

  upadteTask: z.object({
    title: taskCore.title.optional(),
    description: taskCore.description.optional(),
    status: taskCore.status.optional(),
  }),
};

export type CreateTask = z.infer<typeof taskRequestSchemas.createTask>;
export type GetTaskById = z.infer<typeof taskRequestSchemas.getTaskById>;
export type UpdateTask = z.infer<typeof taskRequestSchemas.upadteTask>;
