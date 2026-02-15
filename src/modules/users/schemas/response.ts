import z from "zod";
import { userCore } from "./core";

export const userResponseSchemas = {
  getUser: z.object({
    id: userCore.id,
    email: userCore.email,
    name: userCore.name,
    roleId: userCore.roleId,
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
