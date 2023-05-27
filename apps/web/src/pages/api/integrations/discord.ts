import type { NextApiRequest, NextApiResponse } from "next";
import { APIMessageComponentInteraction, APIInteractionResponse } from "discord-api-types/v10";
import { createResponse, withDiscordInteraction } from "@/lib/discord";

const handler = async (
    _req: NextApiRequest,
    res: NextApiResponse<APIInteractionResponse>,
    interaction: APIMessageComponentInteraction
) => {
    console.log(interaction)
    return res.status(200).json(createResponse({
        embeds: [
            {
                title: "Hello World!",
                // description: interaction.message.content
            }
        ]
    }))
}

export default withDiscordInteraction(handler)

export const config = {
    api: {
        bodyParser: false,
    },
}