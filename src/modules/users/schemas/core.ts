import { z } from "zod/v4";
export const userCore = {
  id: z
    .string({ error: "Invalid string type" })
    .uuid({ error: "Invalid UUID format" }),
  email: z
    .string({ error: "Invalid string type" })
    .email({ error: "Invalid email format" }),
  name: z
    .string({ error: "Invalid string type" })
    .min(2, { error: "Name must be at least 2 characters" })
    .max(100, { error: "Name must be at most 100 characters" }),
  password: z
    .string({ error: "Invalid string type" })
    .min(6, { error: "Password must be at least 6 characters" })
    .max(100, { error: "Password must be at most 100 characters" }),
  roleKey: z.string({ error: "Invalid string type" }),
  roleId: z
    .number({ error: "Invalid number type" })
    .int({ error: "Invalid int type" }),
};
