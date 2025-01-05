import { buildJsonSchemas } from "fastify-zod";
import {z} from "zod";

const createGoalSchema = z.object({
    title: z.string(),
    description: z.string(),  
})

const createGoalSchemaResponse = z.object({

    id: z.string(),
    createGoalSchema,
    deadline: z.string(),
    progress: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    userId: z.string(),

})

// model Goal {
//     id          String    @id @default(cuid()) // Unique ID for the goal
//     title       String // Title of the goal
//     description String? // Optional description
//     deadline    DateTime? // Optional deadline for the goal
//     progress    Float     @default(0) // Progress percentage (0 to 100)
//     createdAt   DateTime  @default(now()) // Creation timestamp
//     updatedAt   DateTime  @updatedAt // Auto-updated when modified
//     userId      String // Relation field to User
//     user        User      @relation(fields: [userId], references: [id])
//     projects    Project[] // One goal can have multiple projects
//   }

export type CreateGoalInput = z.infer<typeof createGoalSchemaResponse>;

export const {schemas: goalSchemas, $ref} = buildJsonSchemas({
    createGoalSchema,
    createGoalSchemaResponse
})