import { z } from "zod/v4";
import { taskCore } from "./core";

export const taskParamSchemas = {
  getTaskById: z.object({
    taskId: taskCore.id,
  }),
};

export type GetTaskById = z.infer<typeof taskParamSchemas.getTaskById>;
