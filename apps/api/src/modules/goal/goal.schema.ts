import { GOAL_DESCRIPTION_MAX_LENGTH, GOAL_DESCRIPTION_MIN_LENGTH, GOAL_TITLE_MIN_LENGTH } from "@daylytic/shared/constants";
import { buildJsonSchemas } from "fastify-zod";
import { ProjectSchema } from "modules/project/project.schema.js";
import { TaskSchema } from "modules/task/index.js";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Base

const GoalSchema = z.object({
  id: IdSchema,
  title: z.string().min(GOAL_TITLE_MIN_LENGTH).max(GOAL_DESCRIPTION_MAX_LENGTH),
  description: z.string().min(GOAL_DESCRIPTION_MIN_LENGTH).max(GOAL_DESCRIPTION_MAX_LENGTH),
  userId: IdSchema,
  archived: z.boolean(),
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
const UpdateGoalSchema = GoalSchema.omit({ userId: true });

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
