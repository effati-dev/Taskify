import errorCodes from "./errorCodes";
import type { ResponseError } from "./ResponseError";

export default function (): ResponseError {
  return {
    statusCode: 500,
    code: errorCodes.INTERNAL_SERVER_ERROR,
    name: "Internal Server Error",
    message: "An unexpected error occurred",
  };
}
