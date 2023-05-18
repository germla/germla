import type { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/lib/prisma';
import ajv from "@/lib/validation";
import { Prisma } from '@prisma/client';
import { sendEmailVerification } from "@/lib/email";
import { hashPassword } from "@/lib/hash";

const endpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const secret = '1x0000000000000000000000000000000AA'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        
        case "POST":
            const valid = ajv.validate("signUp", req.body);
            if (!valid) {
                return res.status(400).json({
                    message: 'Invalid request body',
                    code: 'invalid_request_body'
                });
            }
        
            const body = `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(req.body.token)}`
        
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
            const hashedPassword = await hashPassword(req.body.password)

            prisma.user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword,
                },
            }).then((u) => {
                sendEmailVerification(u.id, req.body.email, req.body.name);
                prisma.user.update({
                    where: {
                        id: u.id
                    },  
                    data: {
                        emailVerificationAttempts: {
                            push: new Date()
                        }
                    }
                })
            }).catch((e) => {
                if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
                    if (e.code === 'P2002') {
                        return res.status(400).json({
                            message: 'Email already in use',
                            code: 'email_already_in_use'
                        })
                    }
                } else {
                    throw e;
                }
            })
            break;
        case "GET":

    }
}