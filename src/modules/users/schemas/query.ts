import { z } from "zod/v4";

export const userQuerySchemas = {
  getManyUsers: z.object({
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
  }),
};

export type GetManyUsersQuery = z.infer<typeof userQuerySchemas.getManyUsers>;
