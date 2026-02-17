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
  registerUserHandler: async (
    request: FastifyRequest<{ Body: RegisterUserRequest }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const userRoleId = (request.user as Record<string, any>)?.roleId;

    const user = await userService.registerUser(body, userRoleId);
    return reply.status(201).send(user);
  },

  getAllUsersHandler: async (
    request: FastifyRequest<{ Querystring: GetManyUsersQuery }>,
    reply: FastifyReply,
  ) => {
    const users = await userService.getAllUsers(request.query);
    return reply.status(200).send(users);
  },

  getUserByIdHandler: async (
    request: FastifyRequest<{ Params: GetUserByIdParam }>,
    reply: FastifyReply,
  ) => {
    const user = await userService.getUserById(request.params.userId);
    return reply.status(200).send(user);
  },

  updateUserHandler: async (
    request: FastifyRequest<{
      Params: GetUserByIdParam;
      Body: UpdateUserRequest;
    }>,
    reply: FastifyReply,
  ) => {
    const user = await userService.updateUser(
      request.params.userId,
      request.body as UpdateUserDTO,
    );
    return reply.status(200).send(user);
  },

  changePasswordHandler: async (
    request: FastifyRequest<{
      Params: GetUserByIdParam;
      Body: ChangePasswordRequest;
    }>,
    reply: FastifyReply,
  ) => {
    const user = await userService.changePassword(
      request.params.userId,
      request.body as ChangePasswordDTO,
    );
    return reply.status(200).send(user);
  },

  meHandler: async (request: FastifyRequest, reply: FastifyReply) => {
    const userId = (request.user as Record<string, any>).id;
    const user = await userService.getUserById(userId);
    return reply.status(200).send(user);
  },

  updateMeHandler: async (
    request: FastifyRequest<{ Body: UpdateUserRequest }>,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const user = await userService.updateUser(userId, request.body);
    return reply.status(200).send(user);
  },

  changeMyPasswordHandler: async (
    request: FastifyRequest<{ Body: ChangePasswordDTO }>,
    reply: FastifyReply,
  ) => {
    const userId = (request.user as Record<string, any>).id;
    const user = await userService.changePassword(userId, request.body);
    return reply.status(200).send(user);
  },
};
