import { z } from "zod/v4";
import { taskCore } from "./core";
import { title } from "node:process";

export const taskRequestSchemas = {
  createTask: z.object({
    title: taskCore.title,
    description: taskCore.description.optional(),
    status: taskCore.status,
  }),

  getTaskById: z.object({
    id: taskCore.id,
  }),

  upadteTask: z.object({
    title: taskCore.title.optional(),
    description: taskCore.description.optional(),
    status: taskCore.status.optional(),
  }),
};

export type CreateTask = z.infer<typeof taskRequestSchemas.createTask>;
