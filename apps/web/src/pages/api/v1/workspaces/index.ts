import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authConfig } from '../../auth/[...nextauth]';
import ajv from "@/lib/validation"

// TODO: Proper Validation via Prisma Schema
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            code: 'method_not_allowed',
            message: 'Method not allowed',
        })
    }
    const session = await getServerSession(req, res, authConfig)
    if (!session || !session.user || !session.user.email) return res.status(401).json({ 
        code: 'unauthorized',
        message: 'Unauthorized',
    })
    const valid = ajv.validate('workspaceCreate', req.body)
    if (!valid) return res.status(400).json({
        message: 'Invalid request body',
        code: 'invalid_request_body',
    })
    // Check subdomain availability
    const subDomainExists = await prisma.workspace.findUnique({
        where: {
            subDomain: req.body.subDomain,
        },
    })
    if (subDomainExists) return res.status(409).json({
        message: 'Subdomain already exists',
        code: 'subdomain_exists',
    })
    try {
        const site = await prisma.workspace.create({
            data: {
                name: req.body.name,
                iconURL: req.body.iconURL,
                plan: req.body.plan,
                subDomain: req.body.subDomain,
                owner: {
                    connect: {
                        email: session.user.email,
                    },
                },
            },
        })
        return res.status(201).json(site)
    } catch (error) {
        throw error;
    }
}