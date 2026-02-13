import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

const registerRoutes = (app: FastifyInstance) => {
  app.register(import("../modules/users/user.route"), { prefix: "/users" });
  app.register(import("../modules/auth/auth.route"), { prefix: "/auth" });
  app.register(import("../modules/task/task.route"), { prefix: "/task" });
};

export default registerRoutes;
