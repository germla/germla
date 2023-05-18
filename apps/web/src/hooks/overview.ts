import { useFeedbacks } from "./feedback";

export const useOverviewData = (workspaceId: string) => {
    const { feedbacks, isLoading, isError } = useFeedbacks(workspaceId);

    return {
        feedbacks: {
            data: feedbacks,
            isLoading,
            isError,
        }
    };
}