import z from "zod";
import { userResponseSchemas } from "../../users/schemas/response";

export const authResponseSchemas = {
  login: z.object({
    accessToken: z.string(),
    user: userResponseSchemas.getUser,
  }),
};

export type LoginResponse = z.infer<typeof authResponseSchemas.login>;
