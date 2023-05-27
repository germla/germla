import { captchaProcedure, createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { validateCloudflareToken } from "../util/cf";
import { TRPCError } from "@trpc/server";
import { sendEmailVerification, sendForgotPasswordEmail } from "../util/email";
import { PasswordFormat } from "../util/constants";
import { verifyToken, hashPassword } from "@germla/auth";

export const usersRouter = createTRPCRouter({
    forgotPassword: captchaProcedure
    .input(z.object({
        email: z.string().email()
    }))
    .mutation(async ({ input, ctx }) => {
        const { email } = input;

        const foundUser = await ctx.prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });

        if (!foundUser) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "No user found with this email",
            });
        }

        if (foundUser.passwordResetAttempts.length >= 3) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "You have reached the maximum amount of password reset attempts",
            });
        }

        await sendForgotPasswordEmail(foundUser.id, foundUser.email!, foundUser.name)
        await ctx.prisma.user.update({
            where: {
                id: foundUser.id
            },
            data: {
                passwordResetAttempts: {
                    push: new Date()
                }
            }
        })

        return {
            success: true,
            remainingAttempts: 3 - foundUser.passwordResetAttempts.length - 1
        };
    }),
    createUser: captchaProcedure
    .input(z.object({
        name: z.string().min(3).max(20),
        email: z.string().email(),
        password: z.string().refine((s) => PasswordFormat.test(s), "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character")
    }))
    .mutation(async ({ input, ctx }) => {
        const { email, name, password } = input;

        const foundUser = await ctx.prisma.user.findUnique({
            where: {
                email: email.toLowerCase(),
            },
        });

        if (foundUser) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Email already in use",
            });
        }

        const hashedPassword = await hashPassword(password);

        const user = await ctx.prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: hashedPassword,
            },
        });

        await sendEmailVerification(user.id, email, name);
        await ctx.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                emailVerificationAttempts: {
                    push: new Date()
                }
            }
        })

        return {
            success: true,
        };
    }),
    resetPassword: captchaProcedure  
    .input(z.object({
        password: z.string().refine((s) => PasswordFormat.test(s), "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
        token: z.string()
    }))
    .mutation(async ({ input, ctx }) => {
        const { password, token } = input;

        const { id } = await verifyToken(token) as {
            id: string
        };
        const user = await ctx.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid token or no longer valid",
            });
        }
        await ctx.prisma.user.update({
            where: { id: user.id },
            data: { password: password },
        });
        await sendForgotPasswordEmail(user.id, user.email!, user.name)
        return {
            success: true,
        };
    }),
    verifyEmail: captchaProcedure
    .input(z.object({
        email: z.string().email(),
    }))
    .mutation(async ({ input, ctx }) => {
        const { email } = input;

        const foundUser = await ctx.prisma.user.findUnique({
            where: {
                email: email.toLowerCase()
            }
        })

        if (!foundUser) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "No user found with this email",
            });
        }

        if (foundUser.emailVerificationAttempts.length >= 3) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "You have reached the maximum amount of email verification attempts",
            });
        }
        await sendEmailVerification(foundUser.id, foundUser.email!, foundUser.name)
        await ctx.prisma.user.update({
            where: {
                id: foundUser.id
            },
            data: {
                emailVerificationAttempts: {
                    push: new Date()
                }
            }
        })
        return {
            success: true,
            remainingAttempts: 3 - foundUser.emailVerificationAttempts.length - 1
        };
    }),
});