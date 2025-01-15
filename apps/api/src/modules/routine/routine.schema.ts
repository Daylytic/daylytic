import {
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_DESCRIPTION_MIN_LENGTH,
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from "@daylytic/shared/constants";
import { buildJsonSchemas } from "fastify-zod";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

const DescriptionSchema = z
  .string()
  .max(TASK_DESCRIPTION_MAX_LENGTH)
  .min(TASK_DESCRIPTION_MIN_LENGTH)
  .nullable()
  .refine((value) => value === null || (value.length >= TASK_DESCRIPTION_MIN_LENGTH && value.length <= TASK_DESCRIPTION_MAX_LENGTH), {
    message: `Description must be null or have a length between ${TASK_DESCRIPTION_MIN_LENGTH} and ${TASK_DESCRIPTION_MAX_LENGTH}.`,
  });

// Base
const DailyTaskSchema = z.object({
  id: IdSchema,
  title: z.string().max(TASK_TITLE_MAX_LENGTH).min(TASK_TITLE_MIN_LENGTH),
  description: DescriptionSchema,
  isCompleted: z.boolean(),
  userId: IdSchema,
});

// Create Daily Task Schemas

const CreateDailyTaskInputSchema = DailyTaskSchema.pick({ title: true });
const CreateDailyTaskWithUserIdSchema = CreateDailyTaskInputSchema.extend({
  userId: IdSchema,
});

// Fetch Daily Tasks Schema
const FetchDailyTaskInputSchema = z.object({
  id: IdSchema,
});
const FetchDailyTasksResponseSchema = z.array(DailyTaskSchema);

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
const UpdateDailyTaskInputSchema = DailyTaskSchema.omit({ userId: true });
const UpdateDailyTaskWithUserIdInputSchema = DailyTaskSchema;

export type DailyTask = z.infer<typeof DailyTaskSchema>;
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
    DailyTaskSchema,
    CreateDailyTaskInputSchema,
    FetchDailyTasksResponseSchema,
    DeleteDailyTaskInputSchema,
    UpdateDailyTaskInputSchema,
  },
  { $id: "RoutineSchemas" }
);
