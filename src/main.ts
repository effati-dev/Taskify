import fastify, { type FastifyReply, type FastifyRequest } from "fastify";
import cors from "@fastify/cors";
import { validateRequiredEnvVars } from "./env";
import env from "./env";
import errorHandler from "./errors/errorHandler";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

const app = fastify();

app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});

app.register(fastifyJwt, {
  secret: env.ACCESS_TOKEN_SECRET,
  decoratorName: "accessJwt",
  namespace: "accessJwt",
  jwtSign: "accessJwtSign",
  jwtVerify: "accessJwtVerify",
  jwtDecode: "accessJwtDecode",
});

app.register(fastifyJwt, {
  secret: env.REFRESH_TOKEN_SECRET,
  cookie: { cookieName: "refreshToken", signed: false },
  decoratorName: "refreshJwt",
  namespace: "refreshJwt",
  jwtSign: "refreshJwtSign",
  jwtVerify: "refreshJwtVerify",
  jwtDecode: "refreshJwtDecode",
});

app.register(fastifyCookie, {
  secret: env.COOKIE_SECRET,
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.setErrorHandler(errorHandler);

app.decorate(
  "authenticate",
  async (request: FastifyRequest, _reply: FastifyReply) => {
    await request.accessJwtVerify();
  },
);

app.register(import("./modules/users/user.route"), { prefix: "/users" });
app.register(import("./modules/auth/auth.route"), { prefix: "/auth" });

app.get("/health-check", (_request: FastifyRequest, reply: FastifyReply) =>
  reply.status(200).send({ message: "Ok" }),
);

const start = async () => {
  try {
    validateRequiredEnvVars();
    await app.listen({ host: env.HOSTNAME, port: env.PORT });
    console.log(`Server is running on http://${env.HOSTNAME}:${env.PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
