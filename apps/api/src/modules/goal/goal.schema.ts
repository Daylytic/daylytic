import { buildJsonSchemas } from "fastify-zod";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Base

const GoalSchema = z.object({
    id: IdSchema,
    title: z.string(),
    description: z.string(),
    userId: IdSchema,
});

const CreateGoalInputSchema = GoalSchema.pick({title: true, description: true});
const CreateGoalSchema = GoalSchema.pick({title: true, description: true, userId: true});
const FetchGoalsSchema = GoalSchema.pick({userId: true});
const DeleteGoalInputSchema = GoalSchema.pick({id: true});
const DeleteGoalSchema = GoalSchema.pick({id: true, userId: true});
const UpdateGoalSchema = GoalSchema;

export type GoalSchema = z.infer<typeof GoalSchema>;

export type CreateGoalInputSchema = z.infer<typeof CreateGoalInputSchema>;
export type CreateGoalSchema = z.infer<typeof CreateGoalSchema>;
export type FetchGoalsSchema = z.infer<typeof FetchGoalsSchema>;
export type DeleteGoalInputSchema = z.infer<typeof DeleteGoalInputSchema>;
export type DeleteGoalSchema = z.infer<typeof DeleteGoalSchema>;
export type UpdateGoalSchema = z.infer<typeof UpdateGoalSchema>;

export const { schemas: goalSchemas, $ref } = buildJsonSchemas(
    {
      GoalSchema,
      CreateGoalInputSchema,
      DeleteGoalInputSchema,
      UpdateGoalSchema,
    },
    { $id: "GoalSchemas" }
  );
  