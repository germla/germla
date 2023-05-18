import DashboardLayout from "@/layouts/dashboard";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Menu, Transition } from "@headlessui/react";
import Datepicker from "react-tailwindcss-datepicker";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { useState, Fragment } from "react";
import { useOverviewData } from "@/hooks/overview";
import prisma from "@germla/database";
import { Status, type Workspace } from "@prisma/client";
import type { GetServerSidePropsContext } from "next";
import type { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import { Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    ArcElement
);

type Filter = "custom" | "last24h" | "last7d" | "last30d" | null;

export default function WorkspaceOverview({
    workspace,
}: {
    workspace: Workspace;
}) {
    const router = useRouter();
    const { theme } = useTheme();
    const { feedbacks } = useOverviewData(workspace.id);
    const [filter, setFilter] = useState<Filter>(null);
    const [value, setValue] = useState<DateValueType>({
        startDate: null,
        endDate: null,
    });
    const handleValueChange = (newValue: DateValueType) => {
        setValue(newValue);
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
        scales: {
            x: {
                grid: {
                    color: theme === "dark" ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.05)",
                },
            },
            y: {
                grid: {
                    color: theme === "dark" ? "rgba(255,255,255,.1)" : "rgba(0,0,0,.05)",
                },
            },
        },
    };
    const feedbackData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "All",
                data: [67, 89, 12, 34, 56, 78, 90],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Open",
                data: [12, 34, 56, 78, 90, 12, 34],
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.5)",
            },
            {
                label: "Under review",
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
            {
                label: "Planned",
                data: [23, 45, 67, 89, 12, 34, 56],
                borderColor: "rgb(255, 205, 86)",
                backgroundColor: "rgba(255, 205, 86, 0.5)",
            },
            {
                label: "Completed",
                data: [34, 56, 78, 90, 12, 34, 56],
                borderColor: "rgb(153, 102, 255)",
                backgroundColor: "rgba(153, 102, 255, 0.5)",
            },
            {
                label: "In progress",
                data: [56, 78, 90, 12, 34, 56, 78],
                borderColor: "rgb(255, 159, 64)",
                backgroundColor: "rgba(255, 159, 64, 0.5)",
            },
            {
                label: "Closed",
                data: [45, 67, 89, 12, 34, 56, 78],
                borderColor: "rgb(201, 203, 207)",
                backgroundColor: "rgba(201, 203, 207, 0.5)",
            },
        ],
    };
    const sentimentData = {
        labels: ["Positive", "Neutral", "Negative"],
        datasets: [
            {
                label: "Sentiment",
                data: [
                    feedbacks.data?.filter((feedback) => feedback.sentiment === "POSITIVE").length,
                    feedbacks.data?.filter((feedback) => feedback.sentiment === "NEUTRAL").length,
                    feedbacks.data?.filter((feedback) => feedback.sentiment === "NEGATIVE").length,
                ],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: [
                    "rgb(75, 192, 192)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    const sourcesData = {
        labels: ["Manual", "Intercom", "Discord", "Slack", "Crisp", "Telegram", "Teams"],
        datasets: [
            {
                label: "Feedbacks",
                data: [
                    feedbacks.data?.filter((feedback) => feedback.source === "MANUAL").length,
                    feedbacks.data?.filter((feedback) => feedback.source === "INTERCOM").length,
                    feedbacks.data?.filter((feedback) => feedback.source === "DISCORD").length,
                    feedbacks.data?.filter((feedback) => feedback.source === "SLACK").length,
                    feedbacks.data?.filter((feedback) => feedback.source === "CRISP").length,
                    feedbacks.data?.filter((feedback) => feedback.source === "TELEGRAM").length,
                    feedbacks.data?.filter((feedback) => feedback.source === "TEAMS").length,
                ],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(75, 192, 192)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(201, 203, 207, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    const usersData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: "Users",
                data: [65, 59, 80, 81, 56, 55, 40],
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
        ],
    }
    const { id } = router.query;
    return (
        <DashboardLayout name="Overview" workspace={workspace}>
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
                <h1 className="flex flex-wrap justify-center sm:justify-start mb-8 sm:mb-0 text-xl dark:text-white font-bold -space-x-3 -ml-px">
                    Overview
                </h1>
                <div className="grid grid-flow-col sm:auto-cols-max justify-end gap-2">
                    <div className="relative inline-flex">
                        <Menu className="relative inline-block text-left" as="div">
                            <Menu.Button
                                style={{
                                    padding: ".5rem .75rem",
                                }}
                                className="overview-card h-full inline-flex border-slate-200 dark:border-slate-700 dark:hover:border-slate-600 border rounded shadow-md transition-colors duration-100 items-center justify-center hover:border-slate-300 border-1 text-slate-500 hover:text-slate-600 dark:text-slate-200 dark:hover:text-slate-300"
                            >
                                <span className="sr-only">Filter</span>
                                <wbr />
                                <svg
                                    className="w-4 h-4 dark:fill-slate-200 fill-slate-700"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z"></path>
                                </svg>
                            </Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 shadow-xl mt-2 w-56 origin-top-right rounded-md overview-card dark:text-slate-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item
                                        as={"button"}
                                        onClick={() =>
                                            setFilter(filter === "last24h" ? null : "last24h")
                                        }
                                        className={
                                            "hover:bg-indigo-500 border-b border-slate-300 dark:border-slate-700 group flex justify-between flex-row rounded-sm items-center w-full px-2 py-2 text-sm"
                                        }
                                    >
                                        Last 24 hours
                                        {filter === "last24h" ? (
                                            <span className="mr-2 text-xs flex text-indigo-500 group-hover:text-slate-100">
                                                <svg
                                                    className="w-4 h-4 fill-current"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M6 10.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 10-1.414-1.414L6 10.586z"></path>
                                                </svg>
                                            </span>
                                        ) : null}
                                    </Menu.Item>
                                    <Menu.Item
                                        as={"button"}
                                        onClick={() =>
                                            setFilter(filter === "last7d" ? null : "last7d")
                                        }
                                        className={
                                            "hover:bg-indigo-500 border-b border-slate-300 dark:border-slate-700 group flex justify-between flex-row rounded-sm items-center w-full px-2 py-2 text-sm"
                                        }
                                    >
                                        Last 7 days
                                        {filter === "last7d" ? (
                                            <span className="mr-2 text-xs flex text-indigo-500 group-hover:text-slate-100">
                                                <svg
                                                    className="w-4 h-4 fill-current"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M6 10.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 10-1.414-1.414L6 10.586z"></path>
                                                </svg>
                                            </span>
                                        ) : null}
                                    </Menu.Item>
                                    <Menu.Item
                                        as={"button"}
                                        onClick={() =>
                                            setFilter(filter === "last30d" ? null : "last30d")
                                        }
                                        className={
                                            "hover:bg-indigo-500 border-b border-slate-300 dark:border-slate-700 group flex justify-between flex-row rounded-sm items-center w-full px-2 py-2 text-sm"
                                        }
                                    >
                                        Last 30 days
                                        {filter === "last30d" ? (
                                            <span className="mr-2 text-xs flex text-indigo-500 group-hover:text-slate-100">
                                                <svg
                                                    className="w-4 h-4 fill-current"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M6 10.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 10-1.414-1.414L6 10.586z"></path>
                                                </svg>
                                            </span>
                                        ) : null}
                                    </Menu.Item>
                                    <Menu.Item
                                        as={"button"}
                                        onClick={() =>
                                            setFilter(filter === "custom" ? null : "custom")
                                        }
                                        className={
                                            "hover:bg-indigo-500 group flex justify-between flex-row rounded-sm items-center w-full px-2 py-2 text-sm"
                                        }
                                    >
                                        Custom range
                                        {filter === "custom" ? (
                                            <span className="mr-2 text-xs flex text-indigo-500 group-hover:text-slate-100">
                                                <svg
                                                    className="w-4 h-4 fill-current"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path d="M6 10.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l6-6a1 1 0 10-1.414-1.414L6 10.586z"></path>
                                                </svg>
                                            </span>
                                        ) : null}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>
                    <Transition
                        as={Fragment}
                        show={filter === "custom"}
                        enter="transition ease-out duration-150"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <div className="relative inline-block">
                            <Datepicker
                                primaryColor="indigo"
                                containerClassName={"overview-card"}
                                inputClassName={
                                    "relative shadow-md transition-colors duration-300 py-2.5 pl-4 pr-14 w-full focus:outline-none overview-card dark:text-white/80 rounded-lg tracking-wide font-light text-sm placeholder-slate-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed focus:border-indigo-500"
                                }
                                value={value}
                                placeholder="Select a date range"
                                onChange={handleValueChange}
                                useRange={false}
                            />
                        </div>
                    </Transition>
                </div>
            </div>
            {/* Grid of cards */}
            <div className="grid dark:text-white grid-cols-1 mt-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="overview-card shadow-xl rounded-sm border border-slate-200 dark:border-none p-4">
                    <h4 className="text-lg font-semibold">Total feedback</h4>
                    <p>{feedbacks.data?.length}</p>
                </div>
                <div className="overview-card shadow-xl rounded-sm border border-slate-200 dark:border-none p-4">
                    <h4 className="text-lg font-semibold">Feedback open</h4>
                    <p>
                        {
                            feedbacks.data?.filter(
                                (feedback) => feedback.status === Status.OPEN
                            ).length
                        }
                    </p>
                </div>
                <div className="overview-card shadow-xl rounded-sm border border-slate-200 dark:border-none p-4">
                    <h4 className="text-lg font-semibold">Feedback under review</h4>
                    <p>
                        {
                            feedbacks.data?.filter(
                                (feedback) => feedback.status === Status.UNDER_REVIEW
                            ).length
                        }
                    </p>
                </div>
                <div className="overview-card shadow-xl rounded-sm border border-slate-200 dark:border-none p-4">
                    <h4 className="text-lg font-semibold">Feedback planned</h4>
                    <p>
                        {
                            feedbacks.data?.filter(
                                (feedback) => feedback.status === Status.PLANNED
                            ).length
                        }
                    </p>
                </div>
                <div className="overview-card shadow-xl rounded-sm border border-slate-200 dark:border-none p-4">
                    <h4 className="text-lg font-semibold">Feedback completed</h4>
                    <p>
                        {
                            feedbacks.data?.filter(
                                (feedback) => feedback.status === Status.COMPLETED
                            ).length
                        }
                    </p>
                </div>
                <div className="overview-card shadow-xl rounded-sm border border-slate-200 dark:border-none p-4">
                    <h4 className="text-lg font-semibold">Feedback in progress</h4>
                    <p>
                        {
                            feedbacks.data?.filter(
                                (feedback) => feedback.status === Status.IN_PROGRESS
                            ).length
                        }
                    </p>
                </div>
            </div>
            {/* Graph card */}
            <div className="overview-card dark:text-white rounded-lg shadow-md p-4 mt-4">
                <h4 className="text-lg font-semibold">Visualization</h4>
                <p>Graph of feedback</p>
                <Line data={feedbackData} options={chartOptions} />
            </div>
            <div className="grid dark:text-white mt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="overview-card shadow-xl rounded-sm border border-slate-200 dark:border-none p-4">
                    <h4 className="text-lg font-semibold">Sentiment</h4>
                    <p>Sentiment analysis of feedback</p>
                    <Pie data={sentimentData} />
                </div>
                <div className="overview-card shadow-xl rounded-sm border border-slate-200 dark:border-none p-4">
                    <h4 className="text-lg font-semibold">Sources</h4>
                    <p>Top sources for feedback</p>
                    <Pie data={sourcesData} />
                </div>
                <div className="overview-card shadow-xl rounded-sm border border-slate-200 dark:border-none p-4">
                    <h4 className="text-lg font-semibold">Sources</h4>
                    <p>Top sources for feedback</p>
                    <Line data={usersData} options={chartOptions} />
                </div>
            </div>
        </DashboardLayout>
    );
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
