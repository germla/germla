import { Type, FormatRegistry } from "@sinclair/typebox";
import { TypeCompiler } from "@sinclair/typebox/compiler";

import { EmailFormat, PasswordFormat } from "./constants";

FormatRegistry.Set("email", (value) => EmailFormat.test(value));
FormatRegistry.Set("password", (value) => PasswordFormat.test(value));

const ResetPasswordSchema = TypeCompiler.Compile(
  Type.Object(
    {
      password: Type.String(),
      token: Type.String(),
      captchaToken: Type.String(),
    },
    { additionalProperties: false }
  )
);

const ForgotPasswordSchema = TypeCompiler.Compile(
  Type.Object(
    {
      email: Type.String({ format: "email" }),
      captchaToken: Type.String(),
    },
    { additionalProperties: false }
  )
);

const WorkspaceCreateSchema = TypeCompiler.Compile(
  Type.Object(
    {
      name: Type.String({ minLength: 3, maxLength: 15 }),
      // TODO: Add CDN Regex
      iconURL: Type.Optional(Type.String()),
      subDomain: Type.String({ minLength: 3, maxLength: 30 }),
    },
    { additionalProperties: false }
  )
);

const CreateFeedbackSchema = TypeCompiler.Compile(
  Type.Object(
    {
      feedback: Type.Object(
        {
          title: Type.String(),
          description: Type.String(),
          source: Type.String(),
        },
        { additionalProperties: false }
      ),
    },
    { additionalProperties: false }
  )
);

const SignUpSchema = TypeCompiler.Compile(
  Type.Object(
    {
      token: Type.String(),
      name: Type.String({ minLength: 3, maxLength: 20 }),
      email: Type.String({ format: "email" }),
      password: Type.String({ format: "password" }),
    },
    { additionalProperties: false }
  )
);

const CreateBoardSchema = TypeCompiler.Compile(
  Type.Object(
    {
      boardData: Type.Object(
        {
          name: Type.String({ minLength: 3, maxLength: 15 }),
          visibility: Type.String({ enum: ["PUBLIC", "PRIVATE"] }),
        },
        { additionalProperties: false }
      ),
    },
    { additionalProperties: false }
  )
);

export const schemas = {
  "reset-password": ResetPasswordSchema,
  "forgot-password": ForgotPasswordSchema,
  "workspace-create": WorkspaceCreateSchema,
  "create-feedback": CreateFeedbackSchema,
  "sign-up": SignUpSchema,
  "create-board": CreateBoardSchema,
};
