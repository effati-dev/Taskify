import { z } from "zod/v4";
import { taskCore } from "./core";

export const taskRequestSchemas = {
  createTask: z.object({
    title: taskCore.title,
    description: taskCore.description.optional(),
  }),

  getTaskById: z.object({
    id: taskCore.id,
  }),

  upadteTask: z.object({
    id: taskCore.id,
  }),
};

export type CreateTask = z.infer<typeof taskRequestSchemas.createTask>;
