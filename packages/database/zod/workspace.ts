import * as z from "zod"
import { Visibility, Plan } from "@prisma/client"
import { CompleteBoard, RelatedBoardModel, CompleteWorkspaceMember, RelatedWorkspaceMemberModel, CompleteUser, RelatedUserModel, CompleteFeedback, RelatedFeedbackModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const WorkspaceModel = z.object({
  id: z.string(),
  createdAt: z.date(),
  ownerID: z.string(),
  name: z.string(),
  visibility: z.nativeEnum(Visibility),
  plan: z.nativeEnum(Plan),
  publicallyDisplayDownvotes: z.boolean(),
  anonymousVoting: z.boolean(),
  anonymousComments: z.boolean(),
  requestModeration: z.boolean(),
  anonymousRequests: z.boolean(),
  maxFeedbackCharacters: z.number().int(),
  maxCommentCharacters: z.number().int(),
  maxFeedbackTitleCharacters: z.number().int(),
  integrations: jsonSchema.array(),
  iconURL: z.string().nullish(),
  subDomain: z.string(),
  customDomain: z.string().nullish(),
})

export interface CompleteWorkspace extends z.infer<typeof WorkspaceModel> {
  boards: CompleteBoard[]
  members: CompleteWorkspaceMember[]
  owner: CompleteUser
  Feedback: CompleteFeedback[]
}

/**
 * RelatedWorkspaceModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedWorkspaceModel: z.ZodSchema<CompleteWorkspace> = z.lazy(() => WorkspaceModel.extend({
  boards: RelatedBoardModel.array(),
  members: RelatedWorkspaceMemberModel.array(),
  owner: RelatedUserModel,
  Feedback: RelatedFeedbackModel.array(),
}))
