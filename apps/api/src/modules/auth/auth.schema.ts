import { themes, timezones } from "@daylytic/shared/constants";
import { buildJsonSchemas } from "fastify-zod";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Base

const SessionSchema = z.object({
  token: z.string(),
  userId: IdSchema,
  validUntil: z.date().optional(),
});

const NotificationSubscriptionSchema = z.object({
  id: IdSchema,
  userId: IdSchema,
  endpoint: z.string(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
});

const TimezoneSchema = z.string().refine((val) => timezones.includes(val), {
  message: "Invalid timezone",
});

const ThemeSchema = z.string().refine((val) => themes.includes(val), {
  message: "Invalid theme",
});

export const UserSchema = z.object({
  id: IdSchema,
  googleId: z.string(),
  name: z.string(),
  email: z.string(),
  picture: z.string().base64(),
  createdAt: z.date(),
  lastSeenAt: z.date(),
  timeZone: TimezoneSchema,
  theme: ThemeSchema,
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
  timeZone: TimezoneSchema,
  theme: ThemeSchema,
});

// Create

const CreateUserInputSchema = z.object({
  token: z.string(),
  timeZone: TimezoneSchema,
  theme: ThemeSchema,
});

const CreateUserSchema = GoogleAccountSchema.extend({ googleId: z.string(), id: IdSchema.optional() });

const LoadUserInputSchema = z.object({
  token: z.string(),
  timeZone: TimezoneSchema,
  theme: ThemeSchema,
});

const CreateNotificationSubscriptionInputSchema = NotificationSubscriptionSchema.pick({ endpoint: true, keys: true })
const CreateNotificationSubscriptionSchema = NotificationSubscriptionSchema.pick({ endpoint: true, keys: true, userId: true })

// Fetch

const FetchAuthenticationProfileSchema = SessionSchema.pick({ token: true });
const FetchGoogleAccountInfoSchema = SessionSchema.pick({ token: true });
const FetchUserSchema = UserSchema.pick({ id: true });

// Delete
const DeleteSessionInputSchema = SessionSchema.pick({ token: true });

// Update
const UpdateLastSeenSchema = UserSchema.pick({ id: true });
const UpdateTimezoneInputSchema = UserSchema.pick({ timeZone: true });
const UpdateThemeInputSchema = UserSchema.pick({ theme: true });
const UpdateThemeSchema = UserSchema.pick({ id: true, theme: true });
const UpdateTimezoneSchema = UserSchema.pick({ id: true, timeZone: true });

// Header
const HeaderBearerSchema = z.object({
  authorization: z.string(),
});

export type Session = z.infer<typeof SessionSchema>;
export type User = z.infer<typeof UserSchema>;
export type GoogleAccount = z.infer<typeof GoogleAccountSchema>;
export type CreateUserInput = z.infer<typeof CreateUserInputSchema>;
export type CreateUserSchema = z.infer<typeof CreateUserSchema>;
export type LoadUserInput = z.infer<typeof LoadUserInputSchema>;
export type CreateNotificationSubscriptionInputSchema = z.infer<typeof CreateNotificationSubscriptionInputSchema>;
export type CreateNotificationSubscriptionSchema = z.infer<typeof CreateNotificationSubscriptionSchema>;
export type DeleteSessionInput = z.infer<typeof DeleteSessionInputSchema>;
export type FetchAuthenticationProfile = z.infer<
  typeof FetchAuthenticationProfileSchema
>;
export type FetchUser = z.infer<typeof FetchUserSchema>;
export type FetchGoogleAccountInfo = z.infer<typeof FetchGoogleAccountInfoSchema>;
export type UpdateLastSeen = z.infer<typeof UpdateLastSeenSchema>;
export type UpdateTimezoneInputSchema = z.infer<typeof UpdateTimezoneInputSchema>;
export type UpdateTimezoneSchema = z.infer<typeof UpdateTimezoneSchema>;
export type UpdateThemeInputSchema = z.infer<typeof UpdateThemeInputSchema>;
export type UpdateThemeSchema = z.infer<typeof UpdateThemeSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas(
  {
    UserSchema,
    CreateUserInputSchema,
    GoogleAccountSchema,
    HeaderBearerSchema,
    LoadUserInputSchema,
    UpdateTimezoneInputSchema,
    UpdateThemeInputSchema, 
    CreateNotificationSubscriptionInputSchema
  },
  { $id: "UsersSchema" }
);
