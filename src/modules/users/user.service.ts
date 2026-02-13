import errorCodes from "../../errors/errorCodes";
import { omitUndefined, prisma } from "../../data/prisma";
import { AppError } from "../../errors/AppError";
import { comparePassword, hashPassword } from "../../utils/hash";

import type {
  ChangePasswordDTO,
  RegisterUserDTO,
  UpdateUserDTO,
} from "./user.dto";

export default {
  registerUser: async (input: RegisterUserDTO) => {
    const { password, ...rest } = input;
    return prisma.user.create({
      data: {
        ...rest,
        passwordHash: await hashPassword(password),
      },
    });
  },

  getAllUsers: async () => {
    return prisma.user.findMany();
  },

  getUserById: async (userId: string) => {
    return prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
  },

  updateUser: async (userId: string, input: UpdateUserDTO) => {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: omitUndefined(input),
    });
  },

  changePassword: async (userId: string, input: ChangePasswordDTO) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
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
        id: userId,
      },
      data: {
        passwordHash: await hashPassword(input.newPassword),
      },
    });
  },
};
