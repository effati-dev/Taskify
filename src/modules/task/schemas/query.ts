import { z } from "zod/v4";
import { taskCore } from "./core";

export const taskQuerySchemas = {
  getManyTasks: z.object({
    page: z.coerce
      .number("Invalid number")
      .int("Invalid int type")
      .min(1, { error: "Could not be less than 1" })
      .default(1),
    limit: z.coerce
      .number({ error: "Invalid number" })
      .int({ error: "Invalid int type" })
      .min(1, { error: "Could not be less than 1" })
      .max(100, { error: "Could not be more than 100" })
      .default(10),
    search: z.string("Invalid string").optional(),
    sort: z.enum(["createdAt_asc", "createdAt_desc"]).optional(),
    status: taskCore.status.optional(),
  }),
};

export type GetManyTasksQuery = z.infer<typeof taskQuerySchemas.getManyTasks>;
