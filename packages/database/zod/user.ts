import * as z from "zod"
import { CompleteAccount, RelatedAccountModel, CompleteWorkspace, RelatedWorkspaceModel, CompleteFeedback, RelatedFeedbackModel, CompleteFeedbackComment, RelatedFeedbackCommentModel, CompleteWorkspaceMember, RelatedWorkspaceMemberModel, CompleteBoard, RelatedBoardModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  name: z.string().nullish(),
  password: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  passwordResetAttempts: z.date().array(),
  emailVerificationAttempts: z.date().array(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  accounts: CompleteAccount[]
  workspaces: CompleteWorkspace[]
  feedbacks: CompleteFeedback[]
  featureRequestComments: CompleteFeedbackComment[]
  WorkspaceMember: CompleteWorkspaceMember[]
  Board: CompleteBoard[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  accounts: RelatedAccountModel.array(),
  workspaces: RelatedWorkspaceModel.array(),
  feedbacks: RelatedFeedbackModel.array(),
  featureRequestComments: RelatedFeedbackCommentModel.array(),
  WorkspaceMember: RelatedWorkspaceMemberModel.array(),
  Board: RelatedBoardModel.array(),
}))
