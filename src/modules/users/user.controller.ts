import type { FastifyReply, FastifyRequest } from "fastify";
import type {
  ChangePasswordRequest,
  GetUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
} from "./schemas/request";
import {
  changePassword,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
} from "./user.service";
import baseErrorMapper from "../../errors/baseErrorMapper";
import errorHandler from "../../errors/errorHandler";

export const registerUserHandler = async (
  request: FastifyRequest<{ Body: RegisterUserRequest }>,
  reply: FastifyReply,
) => {
  const body = request.body;
  try {
    const user = await registerUser(body);
    return reply.status(201).send(body);
  } catch (err) {
    const mappedError = baseErrorMapper(err);
    return errorHandler(mappedError, request, reply);
  }
};

export const getAllUsersHandler = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const users = await getAllUsers();
    return reply.status(200).send(users);
  } catch (err) {
    const mappedError = baseErrorMapper(err);
    return errorHandler(mappedError, request, reply);
  }
};

export const getUserByIdHandler = async (
  request: FastifyRequest<{ Params: GetUserRequest }>,
  reply: FastifyReply,
) => {
  try {
    const user = await getUserById(request.params);
    return reply.status(200).send(user);
  } catch (err) {
    const mappedError = baseErrorMapper(err);
    return errorHandler(mappedError, request, reply);
  }
};

export const updateUserHandler = async (
  request: FastifyRequest<{ Params: GetUserRequest; Body: UpdateUserRequest }>,
  reply: FastifyReply,
) => {
  try {
    const user = await updateUser(request.params, request.body);
    return reply.status(200).send(user);
  } catch (err) {
    const mappedError = baseErrorMapper(err);
    return errorHandler(mappedError, request, reply);
  }
};

export const changePasswordHandler = async (
  request: FastifyRequest<{
    Params: GetUserRequest;
    Body: ChangePasswordRequest;
  }>,
  reply: FastifyReply,
) => {
  try {
    const user = await changePassword(request.params, request.body);
    return reply.status(200).send(user);
  } catch (err) {
    const mappedError = baseErrorMapper(err);
    return errorHandler(mappedError, request, reply);
  }
};
