import { z } from "zod/v4";
import { taskCore } from "./core";
import { paginationMetaResponse } from "../../../common/schema";

export const taskResponseSchemas = {
  getTask: z.object({
    data: z.object({
      id: taskCore.id,
      title: taskCore.title,
      description: taskCore.description.optional(),
      status: taskCore.status,
      userId: taskCore.userId,
      createdAt: taskCore.createdAt,
    }),
  }),

  getManyTasks: z.object({
    data: z.array(
      z.object({
        id: taskCore.id,
        title: taskCore.title,
        description: taskCore.description.optional(),
        status: taskCore.status,
        userId: taskCore.userId,
        createdAt: taskCore.createdAt,
      }),
    ),
    meta: paginationMetaResponse,
  }),
};
