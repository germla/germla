import { verify } from "discord-verify/node";
import { env } from "@/env.mjs";
import { APIInteraction, InteractionType, APIInteractionResponse, APIEmbed, APIMessageComponent, APIMessageComponentInteraction } from "discord-api-types/v10"
import type { NextApiRequest, NextApiResponse } from "next"

export type DiscordInteractionApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse<APIInteractionResponse>,
  interaction: APIMessageComponentInteraction
) => void | Promise<void>

/**
 * https://github.com/vercel/next.js/blob/448b74291e40f888bfc82ebd9d306c08d67e98f2/test/integration/api-support/pages/api/no-parsing.js
 */
const parseBodyAsString = (req: NextApiRequest) => {
    return new Promise<string>((resolve) => {
        let data = ""
        req.on("data", (chunk) => {
            data += chunk
        })
        req.on("end", () => {
            resolve(Buffer.from(data).toString())
        })
    })
}

/**
 * Middleware to verify the validity of the incoming webhook request according to https://discord.com/developers/docs/interactions/slash-commands#security-and-authorization
 *
 * When using this middleware, your API route handler must disable body parsing
 */
export const withDiscordInteraction = (next: DiscordInteractionApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const signature = req.headers["x-signature-ed25519"];
    if (!signature || typeof signature !== "string") {
        return res.status(401).end("Missing or Invalid signature header");
    };
	const timestamp = req.headers["x-signature-timestamp"];
    if (!timestamp || typeof timestamp !== "string") {
        return res.status(401).end("Missing or Invalid signature timestamp header");
    };
	const rawBody = await parseBodyAsString(req);
    const isValid = await verify(
		rawBody,
		signature,
		timestamp,
		env.DISCORD_PUBLIC_KEY,
		crypto.subtle
	);

    if (!isValid) {
        return res.status(401).end("Invalid request signature")
    }


    try {
        const interaction: APIInteraction = JSON.parse(rawBody)
        console.log(interaction.data.resolved.messages);
        const { type } = interaction

        if (type === InteractionType.Ping) {
            // PING message, respond with ACK (part of Discord's security and authorization protocol)
            return res.status(200).json({ type: 1 })
        } else if (type === InteractionType.MessageComponent) {
            return await next(req, res, interaction)
        }
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong while processing your interaction",
        })
    }
};

export type DiscordResponse = {
    embeds?: APIEmbed[];
    content?: string;
    components?: APIMessageComponent[];
}

/**
 * Compose a Response object for Discord's API
 */
export const createResponse = (response: DiscordResponse) => {
    return {
        type: 4,
        data: {
            ...response,
        },
    }
}