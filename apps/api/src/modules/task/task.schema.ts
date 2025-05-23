import {
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from "@daylytic/shared/constants";
import { buildJsonSchemas } from "fastify-zod";
import { UserSchema } from "modules/auth/auth.schema.js";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

export const TaskType = z.enum(["ROUTINE", "PROJECT", "EVENT"]);
export const Priority = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL", "OPTIONAL"]).nullable();

export const TitleSchema = z
  .string()
  .max(TASK_TITLE_MAX_LENGTH)
  .min(TASK_TITLE_MIN_LENGTH);

// Define a type alias for valid JSON values.
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

// Create a local recursive schema.
const ContentSchema: z.ZodType<any> = z.lazy(() =>
  z.union([
    z.number(),
    z.string(),
    z.boolean(),
    z.array(z.any()),
    z.record(z.any()),
  ])
);

// Base
export const TaskSchema = z.object({
  id: IdSchema,
  position: z.number(),
  taskType: TaskType, // Specifies the owner type (User or ToDoList)
  priority: Priority,
  title: TitleSchema,
  content: ContentSchema,
  isCompleted: z.boolean().default(false),
  timelyticTask: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().nullable(),
  deadline: z.date().nullable(),
  projectId: IdSchema.nullable(),
  userId: IdSchema.nullable(),
  tagIds: z.array(IdSchema), // References to tag IDs
});

// Create Task Schemas
const CreateTaskInputSchema = TaskSchema.pick({ title: true, taskType: true });
const CreateProjectTaskInputSchema = TaskSchema.pick({ title: true }).merge(z.object({ projectId: IdSchema }));
const CreateTaskWithIdsSchema = CreateTaskInputSchema.extend({
  userId: IdSchema.optional(),
  projectId: IdSchema.optional(),
});

// Fetch Tasks Schema
const FetchTasksInputSchema = z.object({
  userId: IdSchema.optional(),
  projectId: IdSchema.optional(),
});
const FetchTasksWithIdsSchema = z.array(IdSchema);
const FetchTasksResponseSchema = z.array(TaskSchema);
const FetchUserTasksInputSchema = z.object({userId: IdSchema});

// Delete Task Schema
const DeleteTaskInputSchema = z.object({
  id: IdSchema,
});

const DeleteTaskParamsInputSchema = z.object({ taskId: IdSchema });

// Reset Task Schema
const ResetTaskInputSchema = z.object({
  id: IdSchema,
});

// Update Tasks Schema
const UpdateTasksInputSchema = z.array(
  TaskSchema
);
const UpdateTasksSchema = z.object({
  tasks: UpdateTasksInputSchema,
  user: UserSchema,
});;

const VerifyOwnershipSchema = z.object({
  tasks: z.array(TaskSchema),
  userId: IdSchema,
});
const UpdateTasksWithIdInputSchema = z.array(TaskSchema);
const UpdateTasksResponseSchema = z.array(TaskSchema);

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInputSchema = z.infer<typeof CreateTaskInputSchema>;
export type CreateProjectTaskInputSchema = z.infer<typeof CreateProjectTaskInputSchema>;
export type CreateTaskWithIdsSchema = z.infer<typeof CreateTaskWithIdsSchema>;
export type DeleteTaskInputSchema = z.infer<typeof DeleteTaskInputSchema>;
export type DeleteTaskParamsInputSchema = z.infer<typeof DeleteTaskParamsInputSchema>;
export type UpdateTasksInputSchema = z.infer<typeof UpdateTasksInputSchema>;
export type UpdateTasksSchema = z.infer<typeof UpdateTasksSchema>;
export type VerifyOwnershipSchema = z.infer<typeof VerifyOwnershipSchema>;
export type UpdateTasksWithIdInputSchema = z.infer<
  typeof UpdateTasksWithIdInputSchema
>;
export type UpdateTasksResponseSchema = z.infer<
  typeof UpdateTasksResponseSchema
>;
export type ResetTaskInputSchema = z.infer<typeof ResetTaskInputSchema>;
export type FetchTasksInputSchema = z.infer<typeof FetchTasksInputSchema>;
export type FetchTasksWithIdsSchema = z.infer<typeof FetchTasksWithIdsSchema>;
export type FetchUserTasksInputSchema = z.infer<typeof FetchUserTasksInputSchema>;

export const { schemas: taskSchemas, $ref } = buildJsonSchemas(
  {
    TaskSchema,
    CreateTaskInputSchema,
    CreateTaskWithIdsSchema,
    FetchTasksResponseSchema,
    DeleteTaskInputSchema,
    UpdateTasksInputSchema,
    UpdateTasksResponseSchema,
    DeleteTaskParamsInputSchema,
  },
  { $id: "TaskSchemas" }
);
