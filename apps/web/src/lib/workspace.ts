import { CreateWorkspaceData } from "@/types";

export const createWorkspace = async (data: CreateWorkspaceData) => {
    try {
        const res = await fetch("/api/sites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
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