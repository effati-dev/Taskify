import { z } from "zod/v4";
export const userCore = {
  id: z
    .string({ error: "Invalid id type" })
    .uuid({ error: "Invalid UUID format" }),
  email: z
    .string({ error: "Invalid email type" })
    .email({ error: "Invalid email format" }),
  name: z
    .string({ error: "Invalid name type" })
    .min(2, { error: "Name must be at least 2 characters" })
    .max(100, { error: "Name must be at most 100 characters" }),
  password: z
    .string({ error: "Invalid password type" })
    .min(6, { error: "Password must be at least 6 characters" })
    .max(100, { error: "Password must be at most 100 characters" }),
};
