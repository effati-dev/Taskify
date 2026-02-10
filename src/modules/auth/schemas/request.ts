import z from "zod";

export const authRequestSchemas = {
  login: z.object({
    email: z
      .string({ error: "Invalid email type" })
      .email({ error: "Invalid email format" }),
    password: z.string(),
  }),
};

export type LoginRequest = z.infer<typeof authRequestSchemas.login>;
