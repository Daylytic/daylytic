import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const sessionCore = z.object({
    token: z.string(),
    userId: z.string(),
    validUntil: z.date().optional(),
});

const userCore = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string(),
    picture: z.string().nullable(),
    createdAt: z.date(),
    lastSeenAt: z.date(),

})

const createUserSchema = z.object({
    token: z.string()
})

export const createUserSchemaResponse = z.object({
    id: z.string(),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email(),
    name: z.string(),
    picture: z.string().optional(),
})

export type SessionCore = z.infer<typeof sessionCore>
export type UserCore = z.infer<typeof userCore>
export type CreateUserInput = z.infer<typeof createUserSchemaResponse>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserSchemaResponse
}, { $id: "UsersSchema" })