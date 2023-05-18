import * as z from "zod"
import { Role } from "@prisma/client"
import { CompleteUser, RelatedUserModel, CompleteWorkspace, RelatedWorkspaceModel } from "./index"

export const WorkspaceMemberModel = z.object({
  id: z.string(),
  workspaceId: z.string(),
  userId: z.string(),
  role: z.nativeEnum(Role),
  addedAt: z.date(),
})

export interface CompleteWorkspaceMember extends z.infer<typeof WorkspaceMemberModel> {
  user: CompleteUser
  workspace: CompleteWorkspace
}

/**
 * RelatedWorkspaceMemberModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWorkspaceMemberModel: z.ZodSchema<CompleteWorkspaceMember> = z.lazy(() => WorkspaceMemberModel.extend({
  user: RelatedUserModel,
  workspace: RelatedWorkspaceModel,
}))
