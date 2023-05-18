import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteFeedback, RelatedFeedbackModel } from "./index"

export const FeedbackCommentModel = z.object({
  commentId: z.string(),
  feedbackId: z.string(),
  authorId: z.string(),
  content: z.string(),
  createdAt: z.date(),
})

export interface CompleteFeedbackComment extends z.infer<typeof FeedbackCommentModel> {
  author: CompleteUser
  feedback: CompleteFeedback
}

/**
 * RelatedFeedbackCommentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedFeedbackCommentModel: z.ZodSchema<CompleteFeedbackComment> = z.lazy(() => FeedbackCommentModel.extend({
  author: RelatedUserModel,
  feedback: RelatedFeedbackModel,
}))
