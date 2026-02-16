import z from "zod";
import { roleCore, userCore } from "./core";

export const userResponseSchemas = {
  getUser: z.object({
    id: userCore.id,
    email: userCore.email,
    name: userCore.name,
    role: z.object(roleCore),
  }),

  getManyUsers: z.array(
    z.object({
      id: userCore.id,
      email: userCore.email,
      name: userCore.name,
      roleId: userCore.roleId,
    }),
  ),
};

export type GetUserResponse = z.infer<typeof userResponseSchemas.getUser>;
export type GetManyUserResponse = z.infer<
  typeof userResponseSchemas.getManyUsers
>;
