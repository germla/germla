import { isValidRequest } from "discord-verify/node";
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "@/env.mjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {    
    if (!isValidRequest(req, env.DISCORD_PUBLIC_TOKEN)) {
        return res.status(401).json({ error: "Unauthorized" });
    }
}