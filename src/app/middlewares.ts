import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/AppError";

function registerMiddlewares(app: FastifyInstance) {
  // User must be authenticated
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      await request.accessJwtVerify();
    },
  );

  // User must be authorized as given role
  app.decorate(
    "authorize",
    (allowedRoles: string[]) =>
      async (request: FastifyRequest, _reply: FastifyReply) => {
        const userRoles = (request.user as Record<string, any>)
          .roleId as string[];
        let isAuthorized = false;
        allowedRoles.forEach((allowedRole) => {
          if (userRoles.includes(allowedRole)) {
            isAuthorized = true;
            return;
          }
        });
        if (!isAuthorized)
          throw new AppError(403, "FORBIDDEN", "Forbidden", "Acces Denied.");
      },
  );

  // Put user data from accessToken to request.user
  app.addHook(
    "onRequest",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      if (!request.headers.authorization) {
        return;
      }
      try {
        const accessTokenData = (await request.accessJwtDecode()) as Record<
          string,
          any
        >;
        request.user = accessTokenData.user;
      } catch (err) {
        request.log.error(`Token decoding failed: ${err}`);
      }
    },
  );
}

export default registerMiddlewares;
