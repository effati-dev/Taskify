import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import errorCodes from "./errorCodes";
import type { ResponseError } from "./ResponseError";
export default (err: PrismaClientKnownRequestError): ResponseError => {
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
    case "P2003": {
      return {
        statusCode: 400,
        code: errorCodes.PRISMA_FOREIGN_KEY_CONSTRAINT,
        name: "Foreign Key Constraint Error",
        message:
          "Invalid reference: related resource does not exist or is still in use",
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
