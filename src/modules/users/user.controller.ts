import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  ChangePasswordRequest,
  GetUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
} from "./schemas/request";
import userServices from "./user.service";
import type { ChangePasswordDTO, UpdateUserDTO } from "./user.dto";

export default {
  registerUserHandler: async (
    request: FastifyRequest<{ Body: RegisterUserRequest }>,
    reply: FastifyReply,
  ) => {
    const body = request.body;
    const user = await userServices.registerUser(body);
    return reply.status(201).send(user);
  },

  getAllUsersHandler: async (_request: FastifyRequest, reply: FastifyReply) => {
    const users = await userServices.getAllUsers();
    return reply.status(200).send(users);
  },

  getUserByIdHandler: async (
    request: FastifyRequest<{ Params: GetUserRequest }>,
    reply: FastifyReply,
  ) => {
    const user = await userServices.getUserById(request.params);
    return reply.status(200).send(user);
  },

  updateUserHandler: async (
    request: FastifyRequest<{
      Params: GetUserRequest;
      Body: UpdateUserRequest;
    }>,
    reply: FastifyReply,
  ) => {
    const user = await userServices.updateUser(
      request.params,
      request.body as UpdateUserDTO,
    );
    return reply.status(200).send(user);
  },

  changePasswordHandler: async (
    request: FastifyRequest<{
      Params: GetUserRequest;
      Body: ChangePasswordRequest;
    }>,
    reply: FastifyReply,
  ) => {
    const user = await userServices.changePassword(
      request.params,
      request.body as ChangePasswordDTO,
    );
    return reply.status(200).send(user);
  },
};
