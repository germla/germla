import prisma from "@/lib/prisma";
import { withUserAuthAndValidation } from "@/lib/auth";
import { getSentiment } from "@/lib/sentiment";

export default withUserAuthAndValidation(async (req, res, session) => {
    const { id } = req.query
    if (!id || typeof id !== "string") return res.status(400).json({
        code: "invalid_request_query",
        message: "Invalid request query",
    });

    switch (req.method) {
        case "GET":
            const feedbacks = await prisma.feedback.findMany({
                where: {
                    workspace: {
                        id
                    }
                }
            }).then((feedbacks) => {
                return res.status(200).json(feedbacks);
            }).catch((err: Error) => {
                return res.status(500).json({ success: false, message: err.message });
            });
            break;
        case "POST":
            const { boardId } = req.query;
            if (!boardId || typeof boardId !== "string") return res.status(400).json({
                code: "invalid_request_query",
                message: "Invalid request query",
            });
            const { feedback } = req.body;
            if (!feedback) return res.status(401).json({
                code: "invalid_request_body",
                message: "Invalid request body",
            });
            prisma.feedback.create({
                data: {
                    author: {
                        connect: {
                            email: session.user!.email!
                        },
                    },
                    sentiment: getSentiment(feedback.description),
                    board: {
                        connect: {
                            id: boardId
                        },
                    },
                    workspace: {
                        connect: {
                            id
                        },
                    },
                    status: "open",
                    source: feedback.source,
                    title: feedback.title,
                    description: feedback.description,
                }
            }).then(() => {
                return res.status(201).json({ success: true });
            }).catch((err: Error) => {
                return res.status(500).json({ success: false, message: err.message });
            });
            break;
        case "DELETE":
            const { feedbackId } = req.body;
            // if (!feedbackId) return res.status(400).json({
            //     code: "invalid_request_body",
            //     message: "Invalid request body",
            // });
            prisma.feedback.delete({
                where: {
                    id: feedbackId
                }
            }).then(() => {
                return res.status(200).json({ success: true });
            }).catch((err: Error) => {
                return res.status(500).json({ success: false, message: err.message });
            });
            break;
        default:
            return res.status(405).json({
                code: "method_not_allowed",
                message: "Method not allowed",
            });
    }
}, {
    schema: "createFeedback",
    method: "POST"
})
