import type { FastifyError } from "fastify";
import type { ErrorCode } from "./errorCodes";

export class AppError extends Error implements FastifyError {
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
