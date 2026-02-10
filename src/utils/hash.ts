import { hash, compare } from "bcrypt";
import env from "../env";

export const hashPassword = async (password: string) => {
  return hash(password, env.HASH_SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string) => {
  return compare(password, hash);
};
