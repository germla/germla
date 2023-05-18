import ajv from '@/lib/validation';
import prisma from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from '@/lib/jwt';
import { sendResetPasswordNotification } from '@/lib/email';

const endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const secret = '1x0000000000000000000000000000000AA'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method Not Allowed",
            code: "method_not_allowed"
        })
    }
    const valid = ajv.validate("resetPassword", req.body);
    if (!valid) {
        return res.status(400).json({
            message: 'Invalid request body',
            code: 'invalid_request_body'
        });
    }
    const { password, token, captchaToken } = req.body;
    const body = `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(captchaToken)}`

    const cfres = await fetch(endpoint, {
        method: 'POST',
        body,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    })

    const cfjson = await cfres.json()
    if (!cfjson.success) {
        return res.status(400).json({
            message: 'Invalid token',
            code: 'invalid_captcha_token'
        })
    }

    try {
        const { id } = await verifyToken(token) as {
            id: string
        };
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            return res.status(409).json({
                message: "Invalid token or no longer valid",
                code: "invalid_token"
            })
        }
        await prisma.user.update({
            where: { id: user.id },
            data: { password: password },
        });
        sendResetPasswordNotification(user.email!)
        return res.status(200)
    } catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({
                message: e.message,
                name: e.name
            })
        }
    }
}