import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  ChangePasswordRequest,
  RegisterUserRequest,
  UpdateUserRequest,
} from "./schemas/request";
import userServices from "./user.service";
import type { ChangePasswordDTO, UpdateUserDTO } from "./user.dto";
import type { GetUserByIdParam } from "./schemas/params";
import type { GetManyUsersQuery } from "./schemas/query";

export default {
  registerUserHandler: async (
    request: FastifyRequest<{ Body: RegisterUserRequest }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const user = await userServices.registerUser(
      body,
      (request.user as Record<string, any>)?.role,
    );
    return reply.status(201).send(user);
  },

  getAllUsersHandler: async (
    request: FastifyRequest<{ Querystring: GetManyUsersQuery }>,
    reply: FastifyReply,
  ) => {
    const users = await userServices.getAllUsers(request.query);
    return reply.status(200).send(users);
  },

  getUserByIdHandler: async (
    request: FastifyRequest<{ Params: GetUserByIdParam }>,
    reply: FastifyReply,
  ) => {
    const user = await userServices.getUserById(request.params.userId);
    return reply.status(200).send(user);
  },

  updateUserHandler: async (
    request: FastifyRequest<{
      Params: GetUserByIdParam;
      Body: UpdateUserRequest;
    }>,
    reply: FastifyReply,
  ) => {
    const user = await userServices.updateUser(
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
    const user = await userServices.changePassword(
      request.params.userId,
      request.body as ChangePasswordDTO,
    );
    return reply.status(200).send(user);
  },
};
