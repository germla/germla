import { BoardModel, Visibility } from "@germla/database";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const boardRouter = createTRPCRouter({
  getBoards: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/workspaces/{workspaceId}/boards",
      },
    })
    .input(
      z.object({
        workspaceId: z.string(),
      })
    )
    .output(z.array(BoardModel))
    .query(async ({ input, ctx }) => {
      const boards = await ctx.prisma.board.findMany({
        where: {
          workspaceId: input.workspaceId,
        },
        include: {
          feedbacks: false,
          createdBy: true,
        },
      });
      return boards;
    }),
  createBoard: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/workspaces/{workspaceId}/boards",
      },
    })
    .input(
      z.object({
        workspaceId: z.string(),
        name: z.string().min(3).max(25),
        visibility: z.nativeEnum(Visibility),
      })
    )
    .output(BoardModel)
    .query(async ({ input, ctx }) => {
      const board = await ctx.prisma.board.create({
        data: {
          name: input.name,
          visibility: input.visibility,
          workspace: {
            connect: {
              id: input.workspaceId,
            },
          },
          createdBy: {
            connect: {
              email: ctx.session?.email as string,
            },
          },
        },
      });
      return board;
    }),
  deleteBoard: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/workspaces/{workspaceId}/boards/{id}",
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
      await ctx.prisma.board.delete({
        where: {
          id: input.id,
        },
      });
      return { success: true };
    }),
  updateBoard: protectedProcedure
    .meta({
      openapi: {
        method: "PUT",
        path: "/workspaces/{workspaceId}/boards/{id}",
      },
    })
    .input(
      z.object({
        workspaceId: z.string(),
        id: z.string(),
        name: z.string().min(3).max(25),
        visibility: z.nativeEnum(Visibility),
      })
    )
    .output(BoardModel)
    .query(async ({ input, ctx }) => {
      const board = await ctx.prisma.board.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          visibility: input.visibility,
        },
      });
      return board;
    }),
});
