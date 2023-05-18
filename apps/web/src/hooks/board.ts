import useSWR from "swr";
import { type Board, User } from "@prisma/client";
import { fetcher } from "@/lib/utils";

export const useBoards = (workspaceId: string) => {
    const { data: boards, error } = useSWR<(Board & {
        createdBy: User;
    })[]>(
        `/api/v1/workspaces/${workspaceId}/board`,
        fetcher
    );

    console.log(boards);

    return {
        boards,
        isLoading: !error && !boards,
        isError: error,
    };
}