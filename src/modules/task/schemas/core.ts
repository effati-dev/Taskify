import { z } from "zod/v4";
import { prisma } from "../../../data/prisma";

export const taskCore = {
  id: z
    .string({ error: "Invalid id type" })
    .uuid({ error: "Invalid UUID format" }),
  title: z.string({ error: "Invalid title type" }),
  description: z.string({ error: "Invalid description type" }),
  createdAt: z.date({ error: "Invalid title format" }),
  status: z.enum(["todo", "in_progress", "done"], {
    error: "The status can only be between todo, in_progress, done.",
  }),
};
