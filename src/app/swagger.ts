import type { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

const registerSwagger = (app: FastifyInstance) => {
  app.register(swagger, {
    transform: jsonSchemaTransform,
    openapi: {
      info: {
        title: "Taskify",
        description: "Task management API documentation",
        version: "1.0.0",
      },
    },
  });
  app.register(swaggerUi, { routePrefix: "/docs" });
};

export default registerSwagger;
