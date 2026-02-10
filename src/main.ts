import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { HOSTNAME, JWT_SECRET, PORT, validateRequiredEnvVars } from "./env";
import errorHandler from "./errors/errorHandler";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";

export const app = fastify({ logger: true });

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

app.register(fastifyJwt, {
  secret: JWT_SECRET,
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.setErrorHandler(errorHandler);

app.decorate(
  "authenticate",
  async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify();
  },
);

app.register(import("./modules/users/user.route"), { prefix: "/users" });

app.get("/health-check", (_request: FastifyRequest, reply: FastifyReply) =>
  reply.status(200).send({ message: "Ok" }),
);

const start = async () => {
  try {
    validateRequiredEnvVars();
    await app.listen({ host: HOSTNAME, port: PORT });
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
