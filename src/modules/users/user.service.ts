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

export default {
  registerUser: async (input: RegisterUserRequest) => {
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

  getUserById: async (params: GetUserRequest) => {
    return prisma.user.findUniqueOrThrow({
      where: {
        id: params.userId,
      },
    });
  },

  updateUser: async (params: GetUserRequest, input: UpdateUserRequest) => {
    return prisma.user.update({
      where: {
        id: params.userId,
      },
      data: omitUndefined(input),
    });
  },

  changePassword: async (
    params: GetUserRequest,
    input: ChangePasswordRequest,
  ) => {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: params.userId,
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
        id: params.userId,
      },
      data: {
        passwordHash: await hashPassword(input.newPassword),
      },
    });
  },
};
