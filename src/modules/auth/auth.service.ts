import { prisma } from "../../data/prisma";
import { type User } from "../../generated/prisma/client";
import { AppError } from "../../errors/AppError";
import errorCodes from "../../errors/errorCodes";
import { app } from "../../main";
import { comparePassword } from "../../utils/hash";
import type { LoginRequest } from "./schemas/request";

export default {
  login: async (input: LoginRequest) => {
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
  signTokens: (user: User) => {
    const { id, email, name } = user;
    const accessToken = app.jwt.sign(
      { id, email, name, type: "access" },
      { expiresIn: "15m" },
    );
    const refreshToken = app.jwt.sign(
      { id, email, name, type: "refresh" },
      { expiresIn: "7d" },
    );
    return { accessToken, refreshToken };
  },
};
