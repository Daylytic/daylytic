import { buildJsonSchemas } from "fastify-zod";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Base

const GoalSchema = z.object({
    id: IdSchema,
    title: z.string(),
    description: z.string(),
    projectIds: z.array(z.string()),
});

const CreateGoalInputSchema = GoalSchema.pick({title: true, description: true});

export type CreateGoalInputSchema = z.infer<typeof CreateGoalInputSchema>;

export const { schemas: goalSchemas, $ref } = buildJsonSchemas(
    {
      GoalSchema,
      CreateGoalInputSchema,
    },
    { $id: "GoalSchemas" }
  );
  