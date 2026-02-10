import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import type { FastifyError } from "fastify";
import errorCodes from "./errorCodes";
export default (err: PrismaClientKnownRequestError): FastifyError => {
  switch (err.code) {
    case "P2002": {
      const fields = (err.meta as any)?.driverAdapterError?.cause?.constraint
        ?.fields;
      const fieldText =
        Array.isArray(fields) && fields.length > 0
          ? fields.join(", ")
          : "Unique field";
      return {
        statusCode: 409,
        code: errorCodes.PRISMA_UNIQUE_CONSTRAINT_FAILED,
        name: "Conflict",
        message: `${fieldText} already exists`,
      };
    }
    case "P2025":
      return {
        statusCode: 404,
        code: errorCodes.PRISMA_RECORD_NOT_FOUND,
        name: "Not Found",
        message: "The requested record was not found",
      };
    default:
      return {
        statusCode: 500,
        code: errorCodes.PRISMA_UNKNOWN_ERROR,
        name: "Internal Server Error",
        message: "Database error occurred",
      };
  }
};
