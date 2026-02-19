import { z } from "zod/v4";

export const paginationMetaResponse = z.object({
  total: z
    .number({ error: "Invalid number type" })
    .int({ error: "Invalid int type" }),
  page: z
    .number({ error: "Invalid number type" })
    .int({ error: "Invalid int type" }),
  limit: z
    .number({ error: "Invalid number type" })
    .int({ error: "Invalid int type" }),
  totalPages: z
    .number({ error: "Invalid number type" })
    .int({ error: "Invalid int type" }),
});

export const paginationRequest = z.object({
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
});
