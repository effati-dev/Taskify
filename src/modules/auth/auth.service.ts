import { prisma } from "../../data/prisma";
import { AppError } from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import { comparePassword } from "../../utils/hash";
import type { LoginRequest } from "./schemas/request";

export default {
  verifyLogin: async (input: LoginRequest) => {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
    });
    if (!user) {
      throw new AppError(
        401,
        errorCodes.UNAUTHORIZED,
        "Unauthorized",
        "Incorrect email or password",
      );
    }
    const isPasswordValid = await comparePassword(
      input.password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new AppError(
        401,
        errorCodes.UNAUTHORIZED,
        "Unauthorized",
        "Incorrect email or password",
      );
    }
    return user;
  },
};
