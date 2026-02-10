import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { HOSTNAME, PORT, validateRequiredEnvVars } from "./env";
import errorHandler from "./errors/errorHandler";

const app = fastify({ logger: true });

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

app.setErrorHandler(errorHandler);

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
