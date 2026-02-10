import { PrismaPg } from "@prisma/adapter-pg";
import env from "../env";
import { PrismaClient } from "../generated/prisma/client";
import pg from "pg";

const pool = new pg.Pool({ connectionString: env.DATABASE_URL });

const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

export const omitUndefined = <T extends object>(
  obj: T,
): {
  [K in keyof T as T[K] extends undefined ? never : K]: Exclude<
    T[K],
    undefined
  >;
} => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as any;
};
