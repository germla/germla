import { Workspace } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/dashboard";
import useSWR from "swr";

export default function WorkspaceFeedback({ workspace }: { workspace: Workspace }) {
    const { data } = useSWR("/api/v1/workspaces/" + workspace.id + "/feedback", (url: string) => fetch(url).then(res => res.json()));

    const router = useRouter();
    const { id } = router.query
    return (
        <DashboardLayout name="Feedback" workspace={workspace}>
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <h1 className="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 text-xl -space-x-3 -ml-px">
                    Here's all the feedback for this workspace:
                </h1>
                <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    <div className="relative inline-flex">
                        <button style={{
                            padding: ".5rem .75rem",
                        }} className="bg-white border-slate-200 rounded inline-flex shadow-sm transition-colors duration-100 items-center justify-center hover:border-slate-400  border-1 text-slate-500 hover:text-slate-600">
                            <span className="sr-only">Filter</span>
                            <wbr />
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16"><path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
    // const session = getServerSession(ctx.req, ctx.res, authConfig);
    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: "/",
    //             permanent: false
    //         }
    //     }
    // }
    const { id } = ctx.query
    if (!id || typeof id !== "string") {
        throw Error("No site id or invalid id provided.")
    }

    const workspace = await prisma.workspace.findUnique({
        where: {
            id
        }
    })

    return {
        props: {
            workspace
        }
    }
}