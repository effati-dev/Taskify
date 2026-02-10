import z from "zod";
import { userCore } from "./core";

export const getUserResponseSchema = z.object({
  id: userCore.id,
  email: userCore.email,
  name: userCore.name,
});

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;
