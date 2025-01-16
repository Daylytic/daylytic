import { buildJsonSchemas } from "fastify-zod";
import { TaskSchema } from "modules/task/task.schema.js";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Create Daily Task Schemas

const CreateDailyTaskInputSchema = TaskSchema.pick({ title: true, taskType: true });
const CreateDailyTaskWithUserIdSchema = CreateDailyTaskInputSchema.extend({
  userId: IdSchema,
});

// Fetch Daily Tasks Schema
const FetchDailyTaskInputSchema = z.object({
  userId: IdSchema,
});
const FetchDailyTasksResponseSchema = z.array(TaskSchema);

// Delete Daily Task Schema
const DeleteDailyTaskInputSchema = z.object({
  id: IdSchema,
});
const DeleteDailyTaskWithUserIdInputSchema = DeleteDailyTaskInputSchema.extend({
  userId: IdSchema,
});

// Reset Daily Task Schema
const ResetDailyTaskInputSchema = z.object({
  id: IdSchema,
});

// Update Daily Task Schema
const UpdateDailyTaskInputSchema = TaskSchema.omit({ userId: true });
const UpdateDailyTaskWithUserIdInputSchema = TaskSchema;

export type DailyTask = z.infer<typeof TaskSchema>;
export type CreateDailyTaskInputSchema = z.infer<
  typeof CreateDailyTaskInputSchema
>;
export type CreateDailyTaskWithUserIdSchema = z.infer<
  typeof CreateDailyTaskWithUserIdSchema
>;
export type DeleteDailyTaskInputSchema = z.infer<
  typeof DeleteDailyTaskInputSchema
>;
export type DeleteDailyTaskWithUserIdInputSchema = z.infer<
  typeof DeleteDailyTaskWithUserIdInputSchema
>;
export type UpdateDailyTaskInputSchema = z.infer<
  typeof UpdateDailyTaskInputSchema
>;
export type UpdateDailyTaskWithUserIdInputSchema = z.infer<
  typeof UpdateDailyTaskWithUserIdInputSchema
>;
export type ResetDailyTaskInputSchema = z.infer<
  typeof ResetDailyTaskInputSchema
>;
export type FetchDailyTaskInputSchema = z.infer<
  typeof FetchDailyTaskInputSchema
>;

export const { schemas: routineSchemas, $ref } = buildJsonSchemas(
  {
    TaskSchema,
    CreateDailyTaskInputSchema,
    FetchDailyTasksResponseSchema,
    DeleteDailyTaskInputSchema,
    UpdateDailyTaskInputSchema,
  },
  { $id: "RoutineSchemas" }
);
