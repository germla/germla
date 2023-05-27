import { compare, hash } from "bcryptjs";

export const hashPassword = async (password: string) => {
  return hash(password, 12);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return compare(password, hashedPassword);
}
