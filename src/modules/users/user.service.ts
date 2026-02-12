import errorCodes from "../../errors/errorCodes";
import { omitUndefined, prisma } from "../../data/prisma";
import { AppError } from "../../errors/AppError";
import { comparePassword, hashPassword } from "../../utils/hash";

import type {
  ChangePasswordDTO,
  GetUserByIdDTO,
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

  getUserById: async (where: GetUserByIdDTO) => {
    return prisma.user.findUniqueOrThrow({
      where: {
        id: where.userId,
      },
    });
  },

  updateUser: async (where: GetUserByIdDTO, input: UpdateUserDTO) => {
    return prisma.user.update({
      where: {
        id: where.userId,
      },
      data: omitUndefined(input),
    });
  },

  changePassword: async (where: GetUserByIdDTO, input: ChangePasswordDTO) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: where.userId,
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
        id: where.userId,
      },
      data: {
        passwordHash: await hashPassword(input.newPassword),
      },
    });
  },
};
