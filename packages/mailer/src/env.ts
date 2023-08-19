import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    SMTP_HOST: z.string(),
    SMTP_PORT: z.number(),
    SMTP_USERNAME: z.string(),
    SMTP_PASSWORD: z.string(),
    SMTP_SECURE: z.boolean(),
  },
  runtimeEnv: process.env,
});
