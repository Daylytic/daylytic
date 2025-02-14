import {
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from "@daylytic/shared/constants";
import { buildJsonSchemas } from "fastify-zod";
import { TagSchema } from "modules/tag/index.js";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

export const TaskType = z.enum(["ROUTINE", "TODOLIST"]);
export const Priority = z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL", "OPTIONAL"]).nullable();

export const TitleSchema = z
  .string()
  .max(TASK_TITLE_MAX_LENGTH).min(TASK_TITLE_MIN_LENGTH)
  .refine((value) => value === null || (value.length >= TASK_TITLE_MIN_LENGTH && value.length <= TASK_TITLE_MAX_LENGTH), {
    message: `Title must have a length between ${TASK_TITLE_MIN_LENGTH} and ${TASK_TITLE_MAX_LENGTH}.`,
  });

export const ContentSchema: z.ZodType<unknown> = z.lazy(() => z.union([
  z.number(),
  z.string(),
  z.null(),
  z.boolean(),
  z.array(ContentSchema),
  z.record(ContentSchema),
]));

// Base

export const TaskSchema = z.object({
  id: IdSchema,
  position: z.number(),
  taskType: TaskType, // Specifies the owner type (User or ToDoList)
  priority: Priority,
  title: TitleSchema,
  content: ContentSchema,
  isCompleted: z.boolean().default(false),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date(),
  deadline: z.date().nullable(),
  // todoListId: IdSchema.nullable(),
  userId: IdSchema.nullable(),
  tagIds: z.array(IdSchema), // References to tag IDs
});

// Create Task Schemas
const CreateTaskInputSchema = TaskSchema.pick({ title: true, taskType: true });
const CreateTaskWithIdSchema = CreateTaskInputSchema.extend({
  userId: IdSchema.nullable(),
  // todoListId: IdSchema.optional(),
});

// Fetch Tasks Schema
const FetchTaskInputSchema = z.object({
  userId: IdSchema.nullable(),
  // todoListId: IdSchema.optional(),
});
const FetchTasksResponseSchema = z.array(TaskSchema);

// Delete Task Schema
const DeleteTaskInputSchema = z.object({
  id: IdSchema,
});
const DeleteTaskWithIdInputSchema = DeleteTaskInputSchema.extend({
  userId: IdSchema.nullable(),
  // todoListId: IdSchema.optional(),
});

// Reset Task Schema
const ResetTaskInputSchema = z.object({
  id: IdSchema,
});

// Update Task Schema
const UpdateTaskInputSchema = TaskSchema.omit({ userId: true, /*todoListId: true,*/ updatedAt: true, createdAt: true, });
const UpdateTaskWithIdInputSchema = TaskSchema;

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInputSchema = z.infer<
  typeof CreateTaskInputSchema
>;
export type CreateTaskWithIdSchema = z.infer<
  typeof CreateTaskWithIdSchema
>;
export type DeleteTaskInputSchema = z.infer<
  typeof DeleteTaskInputSchema
>;
export type DeleteTaskWithIdInputSchema = z.infer<
  typeof DeleteTaskWithIdInputSchema
>;
export type UpdateTaskInputSchema = z.infer<
  typeof UpdateTaskInputSchema
>;
export type UpdateTaskWithIdInputSchema = z.infer<
  typeof UpdateTaskWithIdInputSchema
>;
export type ResetTaskInputSchema = z.infer<
  typeof ResetTaskInputSchema
>;
export type FetchTaskInputSchema = z.infer<
  typeof FetchTaskInputSchema
>;

export const { schemas: taskSchemas, $ref } = buildJsonSchemas(
  {
    TaskSchema,
    CreateTaskInputSchema,
    FetchTasksResponseSchema,
    DeleteTaskInputSchema,
    UpdateTaskInputSchema,
  },
  { $id: "TaskSchemas" }
);