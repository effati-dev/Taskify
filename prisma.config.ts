import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import { DATABASE_URL } from "./src/env";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: DATABASE_URL,
  },
});
