import prisma from "@germla/database";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { Workspace } from "@prisma/client";
import DashboardLayout from "@/layouts/dashboard";
import { useSession } from "next-auth/react";

export default function SiteDashboard({ workspace }: { workspace: Workspace }) {
    const { data } = useSession();
    return (
        <DashboardLayout name="Dashboard" workspace={workspace}>
            <h1 className="text-xl">
                Welcome, {data?.user?.name} 👋
            </h1>
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
        throw Error("No workspace id or invalid id provided.")
    }

    const workspace = await prisma.workspace.findUnique({
        where: {
            id
        }
    })

    if (!workspace) {
        throw Error("No workspace found with that id.")
    }

    workspace.createdAt = workspace?.createdAt?.toISOString()

    return {
        props: {
            workspace
        }
    }
}