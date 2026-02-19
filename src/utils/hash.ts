import { hash, compare } from "bcrypt";
import env from "../env";

export async function hashPassword(password: string) {
  return hash(password, env.HASH_SALT_ROUNDS);
}

export async function comparePassword(password: string, hash: string) {
  return compare(password, hash);
}
