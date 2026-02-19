import errorCodes from "../../errors/errorCodes";
import { omitUndefined, prisma } from "../../data/prisma";
import { AppError } from "../../errors/AppError";
import { comparePassword, hashPassword } from "../../utils/hash";
import type {
  ChangePasswordDTO,
  GetAllUsersQueryDTO,
  RegisterUserDTO,
  UpdateUserDTO,
} from "./user.dto";
import type {
  UserOrderByWithRelationInput,
  UserWhereInput,
} from "../../generated/prisma/models";
import { buildOrderBy } from "../../utils/sort";
import { buildPagination } from "../../utils/pagination";

export default {
  registerUser: async (input: RegisterUserDTO, userRoleId?: string) => {
    const { roleId, password, ...rest } = input;

    // Only admins are allowed to set roleId
    const finalRoleId = userRoleId === "admin" && roleId ? roleId : "user";
    const user = await prisma.user.create({
      data: {
        ...rest,
        passwordHash: await hashPassword(password),
        roleId: finalRoleId,
      },
      include: { role: true },
    });
    console.log(user);
    return user;
  },

  getAllUsers: async (query: GetAllUsersQueryDTO) => {
    const { skip, take } = buildPagination(query.page, query.limit);
    // Use search field to search in names and emails
    const where: UserWhereInput = {
      ...(query.search && {
        OR: [
          { email: { contains: query.search, mode: "insensitive" } },
          { name: { contains: query.search, mode: "insensitive" } },
        ],
      }),
    };
    // OrderBy createdAt desc by default
    const orderBy = buildOrderBy<UserOrderByWithRelationInput>(query.sort, {
      createdAt: "desc",
    });
    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
      prisma.user.count({ where }),
    ]);

    return [users, count];
  },

  getUserById: async (userId: string) => {
    return prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: { role: true },
    });
  },

  getUserByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
      include: { role: true },
    });
  },

  updateUser: async (userId: string, input: UpdateUserDTO) => {
    const { roleId: _roleId, ...rest } = input;
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: omitUndefined(rest),
      include: { role: true },
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
      include: { role: true },
    });
  },
};
