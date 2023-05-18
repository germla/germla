export const createFeedback = async (workspaceId: string, boardId: string, title: string, description: string, source: string) => {
    try {
        const res = await fetch(`/api/v1/workspaces/${workspaceId}/feedback?boardId=${boardId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                feedback: {
                    title,
                    description,
                },
            }),
        })
        if (res.status !== 201) {
            const json = await res.json();
            throw Error(json.message);
        }
        return await res.json()
    } catch (e: any) {
        throw Error(`${e.message}`)
    }
}

export const deleteFeedback = async (workspaceId: string, boardId: string, feedbackId: string) => {
    try {
        const res = await fetch(`/api/v1/workspaces/${workspaceId}/feedback?boardId=${boardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                feedbackId,
                boardId,
            }),
        })
        if (res.status !== 200) {
            const json = await res.json();
            throw Error(json.message);
        }
        return await res.json()
    } catch (e: any) {
        throw Error(`${e.message}`)
    }
}

export const getFeedbacks = async (workspaceId: string, boardId: string) => {
    try {
        const res = await fetch(`/api/v1/workspaces/${workspaceId}/feedback?boardId=${boardId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if (res.status !== 200) {
            const json = await res.json();
            throw Error(json.message);
        }
        return await res.json()
    } catch (e: any) {
        throw Error(`${e.message}`)
    }
}

