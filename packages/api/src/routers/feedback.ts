import { FeedbackModel, Status } from "@germla/database";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { getSentiment } from "../util/sentiment";

export const feedbackRouter = createTRPCRouter({
    getFeedbacks: protectedProcedure
        .meta({
            openapi: {
                method: "GET",
                path: "/workspaces/{workspaceId}/feedback",
            },
        })
        .input(
            z.object({
                workspaceId: z.string(),
            })
        )
        .output(z.array(FeedbackModel))
        .query(async ({ input, ctx }) => {
            const feedbacks = await ctx.prisma.feedback.findMany({
                where: {
                    workspaceId: input.workspaceId,
                },
                include: {
                    board: true,
                },
            });
            return feedbacks;
        }),
    createFeedback: protectedProcedure
        .meta({
            openapi: {
                method: "POST",
                path: "/workspaces/{workspaceId}/feedback",
            },
        })
        .input(
            z.object({
                workspaceId: z.string(),
                boardId: z.string(),
                feedback: FeedbackModel.partial().pick({
                    title: true,
                    description: true,
                    source: true,
                }).required(),
            })
        )
        .output(FeedbackModel)
        .query(async ({ input, ctx }) => {
            const feedback = await ctx.prisma.feedback.create({
                data: {
                    sentiment: getSentiment(input.feedback.description),
                    status: Status.OPEN,
                    source: input.feedback.source,
                    title: input.feedback.title,
                    description: input.feedback.description,
                    board: {
                        connect: {
                            id: input.boardId,
                        },
                    },
                    workspace: {
                        connect: {
                            id: input.workspaceId,
                        },
                    },
                    author: {
                        connect: {
                            email: ctx.session?.email as string,
                        },
                    }
                },
            });
            return feedback;
        }),
    deleteFeedback: protectedProcedure
        .meta({
            openapi: {
                method: "DELETE",
                path: "/workspaces/{workspaceId}/feedback/{id}",
            },
        })
        .input(
            z.object({
                workspaceId: z.string(),
                id: z.string(),
            })
        )
        .output(z.object({ success: z.boolean() }))
        .query(async ({ input, ctx }) => {
            await ctx.prisma.feedback.delete({
                where: {
                    id: input.id,
                },
            });
            return { success: true };
        }),
    updateFeedback: protectedProcedure
        .meta({
            openapi: {
                method: "PUT",
                path: "/workspaces/{workspaceId}/feedback/{id}",
            },
        })
        .input(
            z.object({
                workspaceId: z.string(),
                id: z.string(),
                feedback: FeedbackModel.partial().pick({
                    title: true,
                    description: true,
                    source: true,
                    status: true,
                })
            })
        )
        .output(FeedbackModel)
        .query(async ({ input, ctx }) => {
            const feedback = await ctx.prisma.feedback.update({
                where: {
                    id: input.id,
                },
                data: {
                    title: input.feedback.title,
                    description: input.feedback.description,
                    source: input.feedback.source,
                    status: input.feedback.status,
                },
            });
            return feedback;
        }),
});
