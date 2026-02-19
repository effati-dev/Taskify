import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  ChangePasswordRequest,
  RegisterUserRequest,
  UpdateUserRequest,
} from "./schemas/request";
import userService from "./user.service";
import type { ChangePasswordDTO, UpdateUserDTO } from "./user.dto";
import type { GetUserByIdParam } from "./schemas/params";
import type { GetManyUsersQuery } from "./schemas/query";

export default {
  registerUserHandler: async function (
    request: FastifyRequest<{ Body: RegisterUserRequest }>,
    reply: FastifyReply,
  ) {
    const body = request.body;
    const userRoleId = (request.user as Record<string, any>)?.roleId;

    const user = await userService.registerUser(body, userRoleId);
    return reply.status(201).send(user);
  },

  getAllUsersHandler: async function (
    request: FastifyRequest<{ Querystring: GetManyUsersQuery }>,
    reply: FastifyReply,
  ) {
    const [users, total] = await userService.getAllUsers(request.query);
    const { page, limit } = request.query;
    const meta = {
      total,
      page,
      limit,
      totalPages: Math.ceil((total as number) / limit),
    };
    return reply.status(200).send({ data: users, meta });
  },

  getUserByIdHandler: async function (
    request: FastifyRequest<{ Params: GetUserByIdParam }>,
    reply: FastifyReply,
  ) {
    const user = await userService.getUserById(request.params.userId);
    return reply.status(200).send({ data: user });
  },

  updateUserHandler: async function (
    request: FastifyRequest<{
      Params: GetUserByIdParam;
      Body: UpdateUserRequest;
    }>,
    reply: FastifyReply,
  ) {
    const user = await userService.updateUser(
      request.params.userId,
      request.body as UpdateUserDTO,
    );
    return reply.status(200).send({ data: user });
  },

  changePasswordHandler: async function (
    request: FastifyRequest<{
      Params: GetUserByIdParam;
      Body: ChangePasswordRequest;
    }>,
    reply: FastifyReply,
  ) {
    const user = await userService.changePassword(
      request.params.userId,
      request.body as ChangePasswordDTO,
    );
    return reply.status(200).send({ data: user });
  },

  meHandler: async function (request: FastifyRequest, reply: FastifyReply) {
    const userId = (request.user as Record<string, any>).id;
    const user = await userService.getUserById(userId);
    return reply.status(200).send({ data: user });
  },

  updateMeHandler: async function (
    request: FastifyRequest<{ Body: UpdateUserRequest }>,
    reply: FastifyReply,
  ) {
    const userId = (request.user as Record<string, any>).id;
    const user = await userService.updateUser(userId, request.body);
    return reply.status(200).send({ data: user });
  },

  changeMyPasswordHandler: async function (
    request: FastifyRequest<{ Body: ChangePasswordDTO }>,
    reply: FastifyReply,
  ) {
    const userId = (request.user as Record<string, any>).id;
    const user = await userService.changePassword(userId, request.body);
    return reply.status(200).send({ data: user });
  },
};
