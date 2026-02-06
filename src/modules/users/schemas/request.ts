import { z } from "zod/v4";
import { userCore } from "./core";

const registerUserRequestSchema = z.object({
  email: userCore.email,
  name: userCore.name,
  password: userCore.password,
});

const getUserRequestSchema = z.object({
  id: userCore.id,
});

const updateUserRequestSchema = z.object({
  id: userCore.id,
  email: userCore.email.optional(),
  name: userCore.name.optional(),
  password: userCore.password.optional(),
});

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;
export type GetUserRequest = z.infer<typeof getUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
