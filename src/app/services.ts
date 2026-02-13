import type { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import env from "../env";

const registerServices = (app: FastifyInstance) => {
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
};

export default registerServices;
