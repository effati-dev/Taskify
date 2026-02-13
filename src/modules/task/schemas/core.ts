import { z } from "zod/v4";

export const taskCore = {
  id: z
    .string({ error: "Invalid id type" })
    .uuid({ error: "Invalid UUID format" }),
  title: z.string({ error: "Invalid title type" }),
  description: z.string({ error: "Invalid description type" }),
};
