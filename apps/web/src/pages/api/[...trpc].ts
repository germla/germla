import { NextApiRequest, NextApiResponse } from 'next';
import cors from 'nextjs-cors';
import { createOpenApiNextHandler } from 'trpc-openapi';
import { appRouter, createTRPCContext } from "@germla/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  // Handle incoming OpenAPI requests
  return createOpenApiNextHandler({
    router: appRouter,
    createContext: createTRPCContext,
  })(req, res);
};

export default handler;