import {
  type SignPayloadType,
  type SignOptions,
  type VerifyOptions,
  type VerifyPayloadType,
  type FastifyJwtDecodeOptions,
  type DecodePayloadType,
} from "@fastify/jwt";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
    authorize: (
      allowedRoles: string[],
    ) => (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
  interface FastifyRequest {
    accessJwtVerify: (
      options?: Partial<VerifyOptions>,
    ) => Promise<VerifyPayloadType>;
    refreshJwtVerify: (
      options?: Partial<VerifyOptions>,
    ) => Promise<VerifyPayloadType>;
    accessJwtDecode: (
      options?: FastifyJwtDecodeOptions,
    ) => Promise<DecodePayloadType>;
    refreshJwtDecode: (
      options?: FastifyJwtDecodeOptions,
    ) => Promise<DecodePayloadType>;
  }
  interface FastifyReply {
    accessJwtSign: (
      payload: SignPayloadType,
      options: Partial<SignOptions>,
    ) => Promise<string>;
    refreshJwtSign: (
      payload: SignPayloadType,
      options: Partial<SignOptions>,
    ) => Promise<string>;
  }
}
