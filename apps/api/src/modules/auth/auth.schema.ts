import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { analyticsCore } from "../analytics/analytics.schema.js";

const sessionCore = z.object({
    token: z.string(),
    userId: z.string(),
    validUntil: z.date().optional(),
});

const userCore = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    picture: z.string(),
    createdAt: z.date(),
    lastSeenAt: z.date(),
    timeZone: z.string(),
})

const createUserSchema = z.object({
    token: z.string(),
    timeZone: z.string().optional(),
})

export const googleAccountCore = z.object({
    id: z.string(),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email(),
    name: z.string(),
    picture: z.string(),
    timeZone: z.string(),
})

const headersBearer = z.object({
    authorization: z.string(),
})

export type SessionCore = z.infer<typeof sessionCore>
export type UserCore = z.infer<typeof userCore>
export type CreateGoogleUserInput = z.infer<typeof googleAccountCore>;
export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    userCore,
    createUserSchema,
    googleAccountCore,
    headersBearer,
}, { $id: "UsersSchema" })