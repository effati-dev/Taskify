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
  registerUser: async (input: RegisterUserDTO, userRole?: string) => {
    const { roleId, password, ...rest } = input;
    let role = "user";
    if (userRole === "admin")
      role = (await prisma.role.findUniqueOrThrow({ where: { id: roleId } }))
        .key;
    const user = await prisma.user.create({
      data: {
        ...rest,
        passwordHash: await hashPassword(password),
        role: { connect: { key: role } },
      },
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

    return prisma.user.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  },

  getUserById: async (userId: string) => {
    return prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: { role: true },
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
