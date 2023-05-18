import { compare, hash } from "bcryptjs";
import { createHash, randomBytes } from "crypto";

export const hashApiKey = (apiKey: string) => {
  return createHash("sha256").update(apiKey).digest("hex");
};

export const generateApiKey = () => {
  const string = randomBytes(32).toString("hex");
  const hash = hashApiKey(string);
  return {
    string,
    hash,
  };
};