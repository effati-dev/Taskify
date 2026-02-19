import z from "zod";
import { userResponseSchemas } from "../../users/schemas/response";

export const authResponseSchemas = {
  login: z.object({
    data: z.object({
      user: userResponseSchemas.getUser.shape.data,
      accessToken: z.string(),
    }),
  }),
};

export type LoginResponse = z.infer<typeof authResponseSchemas.login>;
