import { z } from "zod/v4";
import { userCore } from "./core";

export const userParamSchemas = {
  getUserById: z.object({
    userId: userCore.id,
  }),
};

export type GetUserByIdParam = z.infer<typeof userParamSchemas.getUserById>;
