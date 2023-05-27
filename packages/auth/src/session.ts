import type {
    GetServerSidePropsContext,
    NextApiRequest,
    NextApiResponse,
} from "next";
import { getServerSession as $getServerSession } from "next-auth";

import { authOptions } from "./options";

type GetServerSessionContext =
    | {
        req: GetServerSidePropsContext["req"];
        res: GetServerSidePropsContext["res"];
    }
    | { req: NextApiRequest; res: NextApiResponse };
export const getServerSession = (ctx: GetServerSessionContext) => {
    return $getServerSession(ctx.req, ctx.res, authOptions);
};

export const getServerUser = async (ctx: GetServerSessionContext) => {
    const session = await getServerSession(ctx);
    if (!session) return null;
    return session.user || null;
}