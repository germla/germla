import type { Visibility, Board } from "@prisma/client";

export const createBoard = async (workspaceId: string, name: string, visibility: Visibility) => {
  try {
    const res = await fetch(`/api/v1/workspaces/${workspaceId}/board`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardData: {
          name,
          visibility,
        },
      }),
    });
    if (res.status !== 201) {
      const json = await res.json();
      throw Error(json.message);
    }
    return await res.json();
  } catch (e: any) {
    throw Error(`${e.message}`);
  }
};

export const getBoards = async (workspaceId: string): Promise<Board[]> => {
  try {
    const res = await fetch(`/api/v1/workspaces/${workspaceId}/board`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 200) {
      const json = await res.json();
      throw Error(json.message);
    }
    return await res.json();
  } catch (e: any) {
    throw Error(`${e.message}`);
  }
};
