import * as z from "zod"
import { Visibility } from "@prisma/client"
import { CompleteFeedback, RelatedFeedbackModel, CompleteUser, RelatedUserModel, CompleteWorkspace, RelatedWorkspaceModel } from "./index"

export const BoardModel = z.object({
  id: z.string(),
  workspaceId: z.string(),
  createdById: z.string(),
  name: z.string(),
  visibility: z.nativeEnum(Visibility),
  createdAt: z.date(),
  workspaceMemberId: z.string().nullish(),
})

export interface CompleteBoard extends z.infer<typeof BoardModel> {
  feedbacks: CompleteFeedback[]
  createdBy: CompleteUser
  workspace: CompleteWorkspace
}

/**
 * RelatedBoardModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedBoardModel: z.ZodSchema<CompleteBoard> = z.lazy(() => BoardModel.extend({
  feedbacks: RelatedFeedbackModel.array(),
  createdBy: RelatedUserModel,
  workspace: RelatedWorkspaceModel,
}))
