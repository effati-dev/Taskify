import { z } from "zod/v4";
import { paginationRequest } from "../../../common/schema";

export const userQuerySchemas = {
  getManyUsers: paginationRequest.merge(
    z.object({
      search: z.string("Invalid string").optional(),
      sort: z.enum(["createdAt_asc", "createdAt_desc"]).optional(),
    }),
  ),
};

export type GetManyUsersQuery = z.infer<typeof userQuerySchemas.getManyUsers>;
