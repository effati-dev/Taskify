import z from "zod";

export const authResponseSchemas = {
  login: z.object({
    accessToken: z.string(),
  }),
};

export type LoginResponse = z.infer<typeof authResponseSchemas.login>;
