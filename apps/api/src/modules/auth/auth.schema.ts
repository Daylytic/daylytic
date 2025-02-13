import { buildJsonSchemas } from "fastify-zod";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Base

const SessionSchema = z.object({
  token: z.string(),
  userId: IdSchema,
  validUntil: z.date(),
});

const UserSchema = z.object({
  id: IdSchema,
  name: z.string(),
  email: z.string(),
  picture: z.string(),
  createdAt: z.date(),
  lastSeenAt: z.date(),
  timeZone: z.string(),
});

export const GoogleAccountSchema = z.object({
  id: z.string(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
  name: z.string(),
  picture: z.string(),
  timeZone: z.string(),
});

// Create

const CreateUserInputSchema = z.object({
  token: z.string(),
  timeZone: z.string(),
});

const LoadUserInputSchema = z.object({
    token: z.string(),
    timeZone: z.string().optional(),
  });

// Fetch

const FetchAuthenticationProfileSchema = SessionSchema.pick({ token: true });

const FetchGoogleAccountInfoSchema = SessionSchema.pick({token: true});

const FetchUserSchema = UserSchema.pick({id: true});
// Delete

const DeleteSessionInputSchema = SessionSchema.pick({token: true});

// Update

const UpdateLastSeenSchema = UserSchema.pick({id: true});

// Header

const HeaderBearerSchema = z.object({
  authorization: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;
export type User = z.infer<typeof UserSchema>;
export type GoogleAccount = z.infer<typeof GoogleAccountSchema>;
export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
export type LoadUserInput = z.infer<typeof LoadUserInputSchema>;
export type DeleteSessionInput = z.infer<typeof DeleteSessionInputSchema>;
export type FetchAuthenticationProfile = z.infer<
  typeof FetchAuthenticationProfileSchema
>;
export type FetchUser = z.infer<typeof FetchUserSchema>;
export type FetchGoogleAccountInfo = z.infer<typeof FetchGoogleAccountInfoSchema>;
export type UpdateLastSeen = z.infer<typeof UpdateLastSeenSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    UserSchema,
    CreateUserInputSchema,
    GoogleAccountSchema,
    HeaderBearerSchema,
    LoadUserInputSchema,
  },
  { $id: "UsersSchema" }
);
