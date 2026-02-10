import errorCodes from "../../errors/errorCodes";
import { omitUndefined, prisma } from "../../data/prisma";
import { AppError } from "../../errors/AppError";
import { comparePassword, hashPassword } from "../../utils/hash";
import type {
  ChangePasswordRequest,
  GetUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
} from "./schemas/request";

export const registerUser = async (dto: RegisterUserRequest) => {
  const { password, ...rest } = dto;
  return prisma.user.create({
    data: {
      ...rest,
      passwordHash: await hashPassword(password),
    },
  });
};

export const getAllUsers = async () => {
  return prisma.user.findMany();
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

export const updateUser = async (
  params: GetUserRequest,
  input: UpdateUserRequest,
) => {
  return prisma.user.update({
    where: {
      id: params.id,
    },
    data: omitUndefined(input),
  });
};

export const changePassword = async (
  params: GetUserRequest,
  input: ChangePasswordRequest,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!user) {
    throw new AppError(
      404,
      errorCodes.PRISMA_RECORD_NOT_FOUND,
      "Not Found",
      "User not found",
    );
  }
  const isPasswordValid = await comparePassword(
    input.oldPassword,
    user.passwordHash,
  );
  if (!isPasswordValid) {
    throw new AppError(
      400,
      errorCodes.INVALID_CREDENTIALS,
      "Invalid Credentials",
      "Old password is incorrect",
    );
  }
  return prisma.user.update({
    where: {
      id: params.id,
    },
    data: {
      passwordHash: await hashPassword(input.newPassword),
    },
  });
};
