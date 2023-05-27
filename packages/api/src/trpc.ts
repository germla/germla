/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1)
 * 2. You want to create a new middleware or type of procedure (see Part 3)
 *
 * tl;dr - this is where all the tRPC server stuff is created and plugged in.
 * The pieces you will need to use are documented accordingly near the end
 */
import { TRPCError, initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";
import { getServerUser, type Session, type User } from "@germla/auth";
import prisma from "@germla/database"
import '@germla/database/client'
import { OpenApiMeta } from 'trpc-openapi';
import { z } from "zod";
import { validateCloudflareToken } from "./util/cf";
import type { NextApiRequest } from "next";
/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API
 *
 * These allow you to access things like the database, the session, etc, when
 * processing a request
 *
 */
type CreateContextOptions = {
  user: Omit<User, "id"> | null;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here
 *
 * Examples of things you may need it for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (opts: CreateContextOptions) => {
  return {
    session: opts.user,
    prisma,
  };
};

export const getUserFromReq = async (req: NextApiRequest) => {
  const { authorization } = req.headers;
  if (!authorization) return null;
  const token = authorization.split(" ")[1];
  return {
    email: token,
    image: token,
    name: token,
  };
}


/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  // Get the session from the server using the unstable_getServerSession wrapper function
  const user = await getUserFromReq(req) || (await getServerUser({ req, res }));

  return createInnerTRPCContext({
    user,
  });
};

/**
 * 2. INITIALIZATION
 *
 * This is where the trpc api is initialized, connecting the context and
 * transformer
 */
const t = initTRPC.context<typeof createTRPCContext>().meta<OpenApiMeta>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these
 * a lot in the /src/server/api/routers folder
 */

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next, input }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx
  });
});


const validateCaptchaInput = z.object({ captchaToken: z.string() })
/**
 * Middleware to validate Cloudflare captcha tokens
 */
const validateCaptcha = t.middleware(({ next, rawInput }) => {
  const result = validateCaptchaInput.safeParse(rawInput)
  if (!result.success) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid captcha token",
    });
  }

  const { captchaToken } = result.data;

  const valid = validateCloudflareToken(captchaToken);

  if (!valid) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Invalid captcha token",
    });
  };

  return next();
})

export const captchaProcedure = t.procedure.use(validateCaptcha);

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);