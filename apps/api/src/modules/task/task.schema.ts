import {
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_DESCRIPTION_MIN_LENGTH,
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from "@daylytic/shared/constants";
import { buildJsonSchemas } from "fastify-zod";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

export const TaskType = z.enum(["ROUTINE", "TODOLIST"]);

export const TitleSchema = z
  .string()
  .max(TASK_TITLE_MAX_LENGTH).min(TASK_TITLE_MIN_LENGTH)
  .refine((value) => value === null || (value.length >= TASK_TITLE_MIN_LENGTH && value.length <= TASK_TITLE_MAX_LENGTH), {
    message: `Title must have a length between ${TASK_TITLE_MIN_LENGTH} and ${TASK_TITLE_MAX_LENGTH}.`,
  });

export const DescriptionSchema = z
  .string()
  .max(TASK_DESCRIPTION_MAX_LENGTH)
  .min(TASK_DESCRIPTION_MIN_LENGTH)
  .nullable()
  .refine((value) => value === null || (value.length >= TASK_DESCRIPTION_MIN_LENGTH && value.length <= TASK_DESCRIPTION_MAX_LENGTH), {
    message: `Description must be null or have a length between ${TASK_DESCRIPTION_MIN_LENGTH} and ${TASK_DESCRIPTION_MAX_LENGTH}.`,
  });

export const TagNameSchema = z.string();

// Base

export const TagSchema = z.object({
  id: IdSchema,
  name: TagNameSchema,
  color: z.string(),
  tasks: z.array(z.string()).optional(), // Array of task IDs,
})

export const TaskSchema = z.object({
  id: IdSchema, // Unique ID for the task
  taskType: TaskType, // Specifies the owner type (User or ToDoList)
  priority: z.number().int().default(0), // Allows for custom ordering
  title: TitleSchema, // Title of the task
  description: DescriptionSchema, // Optional description
  isCompleted: z.boolean().default(false), // Task completion status
  createdAt: z.date().default(new Date()), // Creation timestamp
  updatedAt: z.date(), // Auto-updated when modified
  deadline: z.date().nullable(), // Optional deadline
  todoListId: IdSchema.nullable(), // Relation field to ToDoList
  userId: IdSchema.nullable(), // Relation field to User
  // tagIds: z.array(IdSchema).optional(), // References to tag IDs
  tags: z.array(TagSchema).optional(), // References to tag IDs
});

// Create Task Schemas

const CreateTaskInputSchema = TaskSchema.pick({ title: true, taskType: true });
const CreateTaskWithIdSchema = CreateTaskInputSchema.extend({
  userId: IdSchema.optional(),
  todoListId: IdSchema.optional(),
});

// Fetch Tasks Schema
const FetchTaskInputSchema = z.object({
  userId: IdSchema.optional(),
  todoListId: IdSchema.optional(),
});
const FetchTasksResponseSchema = z.array(TaskSchema);

// Delete Task Schema
const DeleteTaskInputSchema = z.object({
  id: IdSchema,
});
const DeleteTaskWithIdInputSchema = DeleteTaskInputSchema.extend({
  userId: IdSchema.optional(),
  todoListId: IdSchema.optional(),
});

// Reset Task Schema
const ResetTaskInputSchema = z.object({
  id: IdSchema,
});

// Update Task Schema
const UpdateTaskInputSchema = TaskSchema.omit({ userId: true, todoListId: true, });
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