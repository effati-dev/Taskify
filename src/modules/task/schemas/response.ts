import { z } from "zod/v4";
import { taskCore } from "./core";
import { title } from "node:process";

export const taskRequestSchemas = {
  getTask: z.object({
    id: taskCore.id,
    title: taskCore.title,
    description: taskCore.description,
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
