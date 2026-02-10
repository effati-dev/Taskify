import type { FastifyReply, FastifyRequest } from "fastify";
import type { RegisterUserRequest } from "./schemas/request";
import { getAllUsers, registerUser } from "./user.service";
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
