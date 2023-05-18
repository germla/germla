import { Feedback } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

export function useFeedbacks(workspaceId: string) {
    const { data: feedbacks, error } = useSWR<Feedback[]>(
        `/api/v1/workspaces/${workspaceId}/feedback`,
        fetcher
    );

    return {
        feedbacks,
        isLoading: !error && !feedbacks,
        isError: error,
    };
}