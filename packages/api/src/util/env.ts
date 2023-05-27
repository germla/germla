import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        CLOUDFLARE_VERIFY_ENDPOINT: z.string().url().optional(),
        CLOUDFLARE_VERIFY_TOKEN: z.string().optional(),
        SMTP_HOST: z.string().optional(),
        SMTP_PORT: z.number().optional(),
        SMTP_SECURE_ENABLED: z.boolean().optional(),
        SMTP_USER: z.string().optional(),
        SMTP_PASSWORD: z.string().optional(),
        DEBUG: z.boolean().optional(),
    },
    runtimeEnv: {
        CLOUDFLARE_VERIFY_ENDPOINT: process.env.CLOUDFLARE_VERIFY_ENDPOINT,
        CLOUDFLARE_VERIFY_TOKEN: process.env.CLOUDFLARE_VERIFY_TOKEN,
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_SECURE_ENABLED: process.env.SMTP_SECURE_ENABLED,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD,
        DEBUG: process.env.DEBUG,
    },
    skipValidation: !!process.env.CI,
    client: {}
});
