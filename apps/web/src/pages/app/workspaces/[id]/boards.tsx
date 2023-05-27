import { Workspace } from "@prisma/client";
import prisma from "@germla/database";
import { getServerSession } from "next-auth";
import { GetServerSidePropsContext } from "next";
import { authConfig } from "@/pages/api/auth/[...nextauth]";
import { useRouter } from "next/router";
import DashboardLayout from "@/layouts/dashboard";
import { useBoards } from "@/hooks/board";
import { useModalStore } from "@/lib/modal";

export default function WorkspaceBoards({ workspace }: { workspace: Workspace }) {
    const { boards } = useBoards(workspace.id)
    const { toggleModal } = useModalStore();
    const router = useRouter();
    const { id } = router.query
    const timeFormatter = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });
    console.log(boards);
    return (
        <DashboardLayout name="Feedback" workspace={workspace}>
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <h1 className="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 font-medium text-3xl -space-x-3 -ml-px">
                    Boards
                </h1>
                <div className="mt-4 justify-end flex float-right sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        onClick={() => toggleModal("board")}
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Create board
                    </button>
                </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="mt-8 flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y dark:divide-zinc-700 divide-zinc-300">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 dark:text-white text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900">
                                                Visibility
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900">
                                                Creation
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 dark:text-white text-left text-sm font-semibold text-gray-900">
                                                Created By
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y dark:divide-zinc-800 divide-zinc-200">
                                        {boards?.map((board) => (
                                            <tr key={board.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium dark:text-white text-gray-900 sm:pl-6">
                                                    {board.name}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300 text-gray-500 first-letter:uppercase">{board.visibility.toLowerCase()}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300 text-gray-500">
                                                    {timeFormatter.format(
                                                        new Date(board.createdAt).getDay() - new Date().getDay(),
                                                        "day"
                                                    )}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm dark:text-zinc-300 text-gray-500">
                                                    {board.createdBy.name}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
    const { id } = ctx.query;
    if (!id || typeof id !== "string") {
        throw Error("No workspace id or invalid id provided.");
    }

    const workspace = await prisma.workspace.findUnique({
        where: {
            id,
        },
    });
    if (!workspace) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    workspace.createdAt = workspace?.createdAt?.toISOString();

    return {
        props: {
            workspace,
        },
    };
}