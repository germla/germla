import { TRPCError } from "@trpc/server";
import { WorkspaceModel } from "@germla/database/zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod"

export const workspaceRouter = createTRPCRouter({
    getWorkspace: protectedProcedure
    .meta({
        openapi: {
            method: 'GET',
            path: '/workspaces/{id}',
        }
    })
    .input(z.object({
        id: z.string(),
    }))
    .output(WorkspaceModel)
    .query(async ({ input, ctx }) => {
        const workspace = await ctx.prisma.workspace.findUnique({
            where: {
                id: input.id
            },
        });
        if (!workspace) throw new TRPCError({
            code: "NOT_FOUND",
            message: "Workspace not found"
        })
        return workspace;
    }),
    createWorkspace: protectedProcedure
    .meta({
        openapi: {
            method: 'POST',
            path: '/workspaces',
        }
    })
    .input(z.object({
        name: z.string().min(3).max(25),
        subDomain: z.string().min(3).max(20),
    }))
    .query(async ({ input, ctx }) => {
        const workspace = await ctx.prisma.workspace.create({
            data: {
                name: input.name,
                subDomain: input.subDomain,
                owner: {
                    connect: {
                        email: ctx.session.user.email as string,
                    },
                },
            },
        });
        return workspace; 
    }),
    getSecretMessage: protectedProcedure.query(() => {
        return "you can see this secret message!";
    }),
});