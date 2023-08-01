import { authRouter } from "./routers/auth";
import { boardRouter } from "./routers/board";
import { feedbackRouter } from "./routers/feedback";
import { usersRouter } from "./routers/user";
import { workspaceRouter } from "./routers/workspace";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  workspace: workspaceRouter,
  board: boardRouter,
  feedback: feedbackRouter,
  user: usersRouter
});

// export type definition of API
export type AppRouter = 
typeof appRouter;