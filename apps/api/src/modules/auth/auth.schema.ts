import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const createUserSchema = z.object({
    token: z.string()
})

const createUserSchemaResponse = z.object({
    id: z.string(),
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email(),
    name: z.string(),
})

export type CreateUserInput = z.infer<typeof createUserSchemaResponse>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
    createUserSchema,
    createUserSchemaResponse
}, { $id: "UsersSchema" })