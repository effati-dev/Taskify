import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export default (
  err: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  const statusCode = err.statusCode || 500;
  const response = {
    error: err.name || "Internal Server Error",
    message: err.message || "An unexpected error occurred",
    name: err.name || "Internal Server Error",
    code: err.code || "INTERNAL_SERVER_ERROR",
  };
  return reply.status(statusCode).send(response);
};
