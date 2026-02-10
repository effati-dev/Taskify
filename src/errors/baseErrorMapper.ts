import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import type { FastifyError } from "fastify";
import fallbackError from "./fallbackError";
import prismaErrorMapper from "./prismaErrorMapper";

export default (err: unknown): FastifyError => {
  if (err instanceof PrismaClientKnownRequestError)
    return prismaErrorMapper(err);
  else return fallbackError;
};
