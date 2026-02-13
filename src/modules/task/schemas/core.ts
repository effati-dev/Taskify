import { z } from "zod/v4";
import { prisma } from "../../../data/prisma";
import { userCore } from "../../users/schemas/core";

export const taskCore = {
  id: z
    .string({ error: "Invalid string type" })
    .uuid({ error: "Invalid UUID format" }),
  title: z.string({ error: "Invalid string type" }),
  description: z.string({ error: "Invalid string type" }),
  createdAt: z.date({ error: "Invalid date format" }),
  status: z.enum(["todo", "in_progress", "done"], {
    error: "can only be between todo, in_progress, done.",
  }),
  userId: userCore.id,
};
