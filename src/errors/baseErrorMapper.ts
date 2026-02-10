import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { type FastifyError } from "fastify";
import fallbackError from "./fallbackError";
import prismaErrorMapper from "./prismaErrorMapper";
import { AppError } from "./AppError";

export default (err: unknown): FastifyError => {
  if (err instanceof PrismaClientKnownRequestError)
    return prismaErrorMapper(err);
  else if (err instanceof AppError) return err;
  else if (isFastifyError(err)) return err;
  else return fallbackError;
};

const isFastifyError = (err: unknown): err is FastifyError =>
  typeof err === "object" && err !== null && "statusCode" in err;
