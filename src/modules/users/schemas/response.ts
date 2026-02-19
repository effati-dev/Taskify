import z from "zod";
import { roleCore, userCore } from "./core";
import { paginationMetaResponse } from "../../../common/schema";

export const userResponseSchemas = {
  getUser: z.object({
    data: z.object({
      id: userCore.id,
      email: userCore.email,
      name: userCore.name,
      role: z.object({
        id: roleCore.id,
        name: roleCore.name,
        description: roleCore.description.optional(),
      }),
    }),
  }),

  getManyUsers: z.object({
    data: z.array(
      z.object({
        id: userCore.id,
        email: userCore.email,
        name: userCore.name,
        roleId: userCore.roleId,
      }),
    ),
    meta: paginationMetaResponse,
  }),
};

export type GetUserResponse = z.infer<typeof userResponseSchemas.getUser>;
export type GetManyUserResponse = z.infer<
  typeof userResponseSchemas.getManyUsers
>;
