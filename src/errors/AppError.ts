import type { FastifyError } from "fastify";
import type { ErrorCode } from "./errorCodes";
import type { ResponseError } from "./ResponseError";

export class AppError extends Error implements ResponseError {
  statusCode: number;
  code: ErrorCode;
  name: string;

  constructor(
    statusCode: number,
    code: ErrorCode,
    name: string,
    message: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.name = name;
  }
}
