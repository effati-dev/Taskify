import { prisma } from "../../data/prisma";
import { hashPassword } from "../../utils/hash";
import type { RegisterUserRequest } from "./schemas/request";

export const registerUser = async (input: RegisterUserRequest) => {
  const { password, ...rest } = input;
  return prisma.user.create({
    data: {
      ...rest,
      passwordHash: await hashPassword(password),
    },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const updateUser = async (id: string, email?: string, name?: string) => {
  const data: Record<string, string> = {};
  if (email) {
    data.email = email;
  }
  if (name) {
    data.name = name;
  }
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const changePassword = async (id: string, newPassword: string) => {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      passwordHash: await hashPassword(newPassword),
    },
  });
};
