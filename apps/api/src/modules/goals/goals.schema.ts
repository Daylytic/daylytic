import { goals as cGoals } from "@daylytic/shared/constants";
import { buildJsonSchemas } from "fastify-zod";
import {z} from "zod";
// import {constants} from "@daylytic/shared";

const goalCreateInput = z.object({
    title: z.string().max(cGoals.MAX_GOAL_TITLE_LENGTH).min(cGoals.MIN_GOAL_TITLE_LENGTH),
    description: z.string().max(cGoals.MAX_GOAL_DESCRIPTION_LENGTH).min(cGoals.MIN_GOAL_DESCRIPTION_LENGTH),
    deadline: z
    .date()
    .nullable()
    .refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Recalculate today at runtime
        return !date || date >= today;
      },
      { message: "Deadline must be today or a future date." }
    ),
    userId: z.string(),
});

const goalDeleteInput = z.object({
    id: z.string()
});

const goalCore = goalCreateInput.extend({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    progress: z.number(),
})

const goals = z.array(goalCore)

export type DeleteGoalInput = z.infer<typeof goalDeleteInput>
export type CreateGoalInput = z.infer<typeof goalCreateInput>;
export type GoalCore = z.infer<typeof goalCore>;

export const {schemas: goalSchemas, $ref} = buildJsonSchemas({
    goalCreateInput,
    goalDeleteInput,
    goalCore,
    goals
}, {$id: "GoalsSchema"})