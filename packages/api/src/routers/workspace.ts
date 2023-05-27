import { TRPCError } from "@trpc/server";
import { WorkspaceModel } from "@germla/database/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const workspaceRouter = createTRPCRouter({
  getWorkspace: protectedProcedure
    .meta({
      openapi: {
        method: "GET",
        path: "/workspaces/{id}",
      },
    })
    .input(
      z.object({
        id: z.string(),
      })
    )
    .output(WorkspaceModel)
    .query(async ({ input, ctx }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!workspace)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workspace not found",
        });
      return workspace;
    }),
  createWorkspace: protectedProcedure
    .meta({
      openapi: {
        method: "POST",
        path: "/workspaces",
      },
    })
    .input(
      z.object({
        name: z.string().min(3).max(25),
        subDomain: z.string().min(3).max(20),
      })
    )
    .output(WorkspaceModel)
    .query(async ({ input, ctx }) => {
      const workspace = await ctx.prisma.workspace.create({
        data: {
          name: input.name,
          subDomain: input.subDomain,
          owner: {
            connect: {
              email: ctx.session?.email as string,
            },
          },
        },
      });
      return workspace;
    }),
  deleteWorkspace: protectedProcedure
    .meta({
      openapi: {
        method: "DELETE",
        path: "/workspaces/{id}",
      },
    })
    .input(
      z.object({
        id: z.string(),
      })
    )
    .output(z.object({ success: z.boolean() }))
    .query(async ({ input, ctx }) => {
      const workspace = await ctx.prisma.workspace.findUnique({
        where: {
          id: input.id,
        },
      });
      if (!workspace)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Workspace not found",
        });
      const deletedWorkspace = await ctx.prisma.workspace.delete({
        where: {
          id: input.id,
        },
      });
      return { success: true };
    }),
});
