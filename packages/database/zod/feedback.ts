import * as z from "zod"
import { Source, Status, Sentiment } from "@prisma/client"
import { CompleteFeedbackComment, RelatedFeedbackCommentModel, CompleteWorkspace, RelatedWorkspaceModel, CompleteUser, RelatedUserModel, CompleteBoard, RelatedBoardModel } from "./index"

export const FeedbackModel = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  upvotes: z.number().int(),
  downvotes: z.number().int(),
  source: z.nativeEnum(Source),
  status: z.nativeEnum(Status),
  sentiment: z.nativeEnum(Sentiment),
  createdAt: z.date(),
  boardId: z.string(),
  authorId: z.string(),
  workspaceId: z.string(),
})

export interface CompleteFeedback extends z.infer<typeof FeedbackModel> {
  comments: CompleteFeedbackComment[]
  workspace: CompleteWorkspace
  author: CompleteUser
  board: CompleteBoard
}

/**
 * RelatedFeedbackModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFeedbackModel: z.ZodSchema<CompleteFeedback> = z.lazy(() => FeedbackModel.extend({
  comments: RelatedFeedbackCommentModel.array(),
  workspace: RelatedWorkspaceModel,
  author: RelatedUserModel,
  board: RelatedBoardModel,
}))
