import fastify from "fastify";
import { validateRequiredEnvVars } from "./env";
import env from "./env";
import errorHandler from "./errors/errorHandler";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import registerRoutes from "./app/routes";
import registerServices from "./app/services";
import registerMiddlewares from "./app/middlewares";
import registerSwagger from "./app/swagger";

export const app = fastify({ logger: true });

app.withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.setErrorHandler(errorHandler);

registerServices(app);

registerMiddlewares(app);

registerSwagger(app);

registerRoutes(app);

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
