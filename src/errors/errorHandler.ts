import {
  type FastifyError,
  type FastifyReply,
  type FastifyRequest,
} from "fastify";
import baseErrorMapper from "./baseErrorMapper";

export default (
  err: unknown,
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  const response = baseErrorMapper(err);

  if (response.statusCode === 500) {
    console.error({
      err,
      code: response.code,
    });
  }
  return reply
    .status(response.statusCode || 500)
    .send({ code: response.code, message: response.message });
};
