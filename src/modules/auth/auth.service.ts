import { prisma } from "../../data/prisma";
import { AppError } from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import { comparePassword } from "../../utils/hash";
import type { LoginDTO } from "./auth.dto";

export default {
  verifyLogin: async (input: LoginDTO) => {
    const user = await prisma.user.findUnique({
      where: { email: input.email },
      include: { role: true },
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
