import { z } from "zod/v4";
import { userCore } from "./core";

export const userRequestSchemas = {
  registerUser: z.object({
    email: userCore.email,
    name: userCore.name,
    password: userCore.password,
    roleId: userCore.roleId,
  }),

  updateUser: z.object({
    email: userCore.email.optional(),
    name: userCore.name.optional(),
    roleId: userCore.roleId.optional(),
  }),

  changePassword: z.object({
    oldPassword: userCore.password,
    newPassword: userCore.password,
  }),
};

export type RegisterUserRequest = z.infer<
  typeof userRequestSchemas.registerUser
>;
export type UpdateUserRequest = z.infer<typeof userRequestSchemas.updateUser>;
export type ChangePasswordRequest = z.infer<
  typeof userRequestSchemas.changePassword
>;
