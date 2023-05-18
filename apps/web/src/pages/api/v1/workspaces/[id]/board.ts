import { withAuthAndConfig } from "@/lib/auth";
import prisma from "@germla/database";

export default withAuthAndConfig(async (req, res, user) => {
    const { id } = req.query;
    switch (req.method) {
        case "GET":
            prisma.board.findMany({
                where: {
                    workspaceId: id
                },
                include: {
                    feedbacks: false,
                    createdBy: true
                }
            }).then((boards) => {
                res.status(200).json(boards);
            }).catch((error) => {
                res.status(500).json({ message: "Failed to get boards" });
            })
            break;
        case "POST": 
            var { boardData } = req.body;
            
    }
})

    const { id } = req.query;
    if (!id || typeof id !== "string") return res.status(400).json({
        code: "invalid_request_query",
        message: "Invalid request query",
    });
    switch (req.method) {
        case "GET":
            var boards = await prisma.board.findMany({
                where: {
                    workspaceId: id
                },
                include: {
                    feedbacks: false,
                    createdBy: true
                }
            });
            return res.status(200).json(boards);
        case "POST":
            var { boardData } = req.body;
            if (!boardData) return res.status(400).json({
                code: "invalid_request_body",
                message: "Invalid request body",
            });

            var createdBoard = await prisma.board.create({
                data: {
                    ...boardData,
                    workspace: {
                        connect: {
                            id
                        }
                    },
                    createdBy: {
                        connect: {
                            email: session.user?.email!
                        }
                    }
                },
            });
            return res.status(201).json(createdBoard);
        default:
            return res.status(405).json({
                code: "method_not_allowed",
                message: "Method not allowed",
            });
    }
}, {
    schema: "createBoard",
    method: "POST",
})