import { z } from "zod/v4";
import { userCore } from "./core";

export const registerUserRequestSchema = z.object({
  email: userCore.email,
  name: userCore.name,
  password: userCore.password,
});

export const getUserRequestSchema = z.object({
  id: userCore.id,
});

export const updateUserRequestSchema = z.object({
  email: userCore.email.optional(),
  name: userCore.name.optional(),
});

export const changePasswordRequestSchema = z.object({
  oldPassword: userCore.password,
  newPassword: userCore.password,
});

export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;
export type GetUserRequest = z.infer<typeof getUserRequestSchema>;
export type UpdateUserRequest = z.infer<typeof updateUserRequestSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordRequestSchema>;
