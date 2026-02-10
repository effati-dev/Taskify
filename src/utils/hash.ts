import { hash, compare } from "bcrypt";
import { HASH_SALT_ROUNDS } from "../env";

export const hashPassword = async (password: string) => {
  return hash(password, HASH_SALT_ROUNDS);
};

export const comparePassword = async (password: string, hash: string) => {
  return compare(password, hash);
};
