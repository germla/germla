import prisma from "@germla/database";
import { env } from "@/env.mjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    _req: NextApiRequest,
    res: NextApiResponse
) {
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000); // Calculate the timestamp 6 hours ago
    const users = await prisma.user.findMany({
        where: {
            OR: [
                {
                    verificationDates: {
                        has: true,
                        some: {
                            date: {
                                lt: new Date(Date.now() - 6 * 60 * 60 * 1000),
                            },
                        },
                    },
                },
                {
                    passwordResetDates: {
                        has: true,
                        some: {
                            date: {
                                lt: new Date(Date.now() - 6 * 60 * 60 * 1000),
                            },
                        },
                    },
                },
            ],
        }
    })

    const maxBatchSize = env.CRON_MAX_BATCH_SIZE || 100; // Define the maximum batch size for updates
    const totalUsers = users.length;
    const batchSize = Math.min(totalUsers, maxBatchSize); // Calculate the dynamic batch size

    for (let i = 0; i < totalUsers; i += batchSize) {
        const batchUsers = users.slice(i, i + batchSize);
        await prisma.user.updateMany({
            where: {
                id: {
                    in: batchUsers.map((user) => user.id),
                },
            },
            data: {
                emailVerificationAttempts: {
                    set: [],
                }
            },
        });         
    }

    return res.status(200).json({
        success: true
    });
}