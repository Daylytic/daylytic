import { buildJsonSchemas } from "fastify-zod";
import { ProjectSchema } from "modules/project/project.schema.js";
import { TaskSchema } from "modules/task/index.js";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Base

const GoalSchema = z.object({
  id: IdSchema,
  title: z.string(),
  description: z.string(),
  userId: IdSchema,
});

const AuthenticateGoalParamsInput = z.object({ goalId: IdSchema });
const CreateGoalInputSchema = GoalSchema.pick({ title: true, description: true });
const CreateGoalSchema = GoalSchema.pick({ title: true, description: true, userId: true });
const FetchGoalsSchema = GoalSchema.pick({ userId: true });
const FetchGoalWithIdSchema = GoalSchema.pick({ id: true, userId: true });
const FetchGoalsResponseSchema = z.array(GoalSchema);
const FetchAllResponseSchema = z.array(GoalSchema.extend({ projects: z.array(ProjectSchema.extend({ tasks: z.array(TaskSchema) })) }));
const DeleteGoalInputSchema = z.object({ goalId: IdSchema });
const DeleteGoalSchema = GoalSchema.pick({ id: true, userId: true });
const UpdateGoalSchema = GoalSchema.omit({ id: true, userId: true });

export type GoalSchema = z.infer<typeof GoalSchema>;

export type AuthenticateGoalParamsInput = z.infer<typeof AuthenticateGoalParamsInput>;
export type CreateGoalInputSchema = z.infer<typeof CreateGoalInputSchema>;
export type CreateGoalSchema = z.infer<typeof CreateGoalSchema>;
export type FetchGoalsSchema = z.infer<typeof FetchGoalsSchema>;
export type FetchGoalWithIdSchema = z.infer<typeof FetchGoalWithIdSchema>;
export type FetchGoalsResponseSchema = z.infer<typeof FetchGoalsResponseSchema>;
export type DeleteGoalInputSchema = z.infer<typeof DeleteGoalInputSchema>;
export type DeleteGoalSchema = z.infer<typeof DeleteGoalSchema>;
export type UpdateGoalSchema = z.infer<typeof UpdateGoalSchema>;

export const { schemas: goalSchemas, $ref } = buildJsonSchemas(
  {
    GoalSchema,
    CreateGoalInputSchema,
    DeleteGoalInputSchema,
    UpdateGoalSchema,
    FetchGoalsResponseSchema,
    FetchAllResponseSchema,
  },
  { $id: "GoalSchemas" }
);
