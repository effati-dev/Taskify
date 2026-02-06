import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../env";
import { PrismaClient } from "../generated/prisma/client";
import pg from "pg";

const pool = new pg.Pool({ connectionString: DATABASE_URL });

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });
