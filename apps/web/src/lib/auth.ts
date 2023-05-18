import { authConfig } from "@/pages/api/auth/[...nextauth]";
import type { User } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { schemas } from "./validation";

interface WithAuthAndConfigHandler<Q extends Record<string, string>> {
  (req: NextApiRequest & { query: Q }, res: NextApiResponse, user: User): Promise<void>;
}

export const getUserFromApiKey = (key: string): User => {
  return {};
};

export const withAuthAndConfig =
  <Q extends Record<string, string>>
  (
    handler: WithAuthAndConfigHandler<Q>,
    {
      allowedMethods,
      schema,
      queries
    }: {
      allowedMethods: string[];
      queries?: string[]
      schema?: keyof typeof schemas;
    } = {
      allowedMethods: ["GET", "POST", "PUT", "DELETE"],
    }
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    // Check for API key
    const apiKey = req.headers["X-Api-Key"] as string;

    // If apiKey present try getting user from it or else use getServerSession
    try {
      const user = apiKey
        ? getUserFromApiKey(apiKey)
        : (await getServerSession(req, res, authConfig)).user;

      // If user is not session and apiKey is not present
      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Check if method is allowed
      if (!allowedMethods.includes(req.method)) {
        return res.status(405).json({ message: "Method not allowed" });
      }

      if (queries) {
        // Check if req.query is valid
        for (let i = 0; i < queries.length; i++) {
          const query = queries[i];
          if (!req.query[query] || typeof req.query[query] !== "string") {
            return res.status(400).json({ message: `Missing or Invalid query: ${query}` });
          }
        }
      }

      // Check if req.body is valid
      const valid = schema ? schemas[schema].Check(req.body) : true;
      if (!valid) {
        return res.status(400).json({ message: "Bad request" });
      } else {
        return handler(req, res, user);
      }
    } catch (e) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
  