import ajv from "@/lib/validation";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';
import { sendEmailVerification, sendForgotPasswordEmail } from '@/lib/email';
const endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const secret = '1x0000000000000000000000000000000AA'



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method Not Allowed",
            code: "method_not_allowed"
        })
    }
    const valid = ajv.validate("forgotPassword", req.body);
    if (!valid) {
        return res.status(400).json({
            message: 'Invalid request body',
            code: 'invalid_request_body'
        });
    }
    const { email, captchaToken } = req.body;
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
        const foundUser = await prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        })

        if (!foundUser) {
            return res.status(409).json({
                message: 'No user found with this email',
                code: 'no_user_found'
            })
        }

        if (foundUser.emailVerificationAttempts.length >= 3) {
            return res.status(409).json({
                message: 'You have reached the maximum amount of email verification attempts',
                code: 'max_email_verification_attempts'
            })
        }
        await sendEmailVerification(foundUser.id, foundUser.email!, foundUser.name)
        prisma.user.update({
            where: {
                id: foundUser.id
            },
            data: {
                emailVerificationAttempts: {
                    push: new Date()
                }
            }
        })
        return res.status(200).json({
            message: 'Email sent'
        })
    } catch (e) {
        if (e instanceof Error) {
            return res.status(500).json({
                message: e.message,
                name: e.name
            })
        }
    }
}