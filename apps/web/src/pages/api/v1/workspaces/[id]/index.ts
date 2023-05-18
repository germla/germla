import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "../../../auth/[...nextauth]";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authConfig);
    if (!session || !session.user || !session.user.email) return res.status(401).json({
        code: "unauthorized",
        message: "Unauthorized",
    });

    const { id } = req.query
    if (!id || typeof id !== "string") return res.status(400).json({
        code: "invalid_request_body",
        message: "Invalid request body",
    });
    switch (req.method) {
        case "GET":
            try {
                const site = await prisma.workspace.findUnique({
                    where: {
                        id
                    },
                });
                return res.status(200).json(site);
            } catch (error) {
                if (error instanceof Error) {
                    return res.status(500).json({
                        message: error.message,
                        name: error.name
                    })
                }
            }
            break;
        case "POST":
            // TODO: Save Settings
        default:
            return res.status(405).json({
                code: "method_not_allowed",
                message: "Method not allowed",
            });
    }
}