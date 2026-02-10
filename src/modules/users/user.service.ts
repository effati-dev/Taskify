import { prisma } from "../../data/prisma";
import { hashPassword } from "../../utils/hash";
import type { RegisterUserRequest } from "./schemas/request";

export const registerUser = async (body: RegisterUserRequest) => {
  const { password, ...rest } = body;
  return prisma.user.create({
    data: {
      ...rest,
      passwordHash: await hashPassword(password),
    },
  });
};
