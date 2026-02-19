import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { type FastifyError } from "fastify";
import fallbackError from "./fallbackError";
import prismaErrorMapper from "./prismaErrorMapper";
import { AppError } from "./AppError";
import type { ResponseError } from "./ResponseError";

export default function (err: unknown): ResponseError {
  if (err instanceof PrismaClientKnownRequestError)
    return prismaErrorMapper(err);
  else if (err instanceof AppError) return err;
  else if (isFastifyError(err)) return err as ResponseError;
  else return fallbackError();
}

function isFastifyError(err: unknown): err is FastifyError {
  return (
    typeof err === "object" &&
    err !== null &&
    "statusCode" in err &&
    "message" in err
  );
}
