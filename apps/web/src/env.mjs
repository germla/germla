import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        CRON_MAX_BATCH_SIZE: z.number().int().positive().optional(),
        DISCORD_PUBLIC_KEY: z.string(),
    },
    client: {
    },
    runtimeEnv: {
        CRON_MAX_BATCH_SIZE: process.env.CRON_MAX_BATCH_SIZE,
        DISCORD_PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY,
    },
    skipValidation: !!process.env.CI,
});