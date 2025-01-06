import { buildJsonSchemas } from "fastify-zod";
import {z} from "zod";

const goalInput = z.object({
    title: z.string(),
    description: z.string(),
    deadline: z.string().optional(),
    progress: z.number().optional(),
})

const goalResponse = goalInput.extend({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export type CreateGoalInput = z.infer<typeof goalResponse>;

export const {schemas: goalSchemas, $ref} = buildJsonSchemas({
    goalInput,
    goalResponse
}, {$id: "GoalsSchema"})