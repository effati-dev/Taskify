import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const registerDecorators = (app: FastifyInstance) => {
  app.decorate(
    "authenticate",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      await request.accessJwtVerify();
    },
  );

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
};

export default registerDecorators;
