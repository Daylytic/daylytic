import {
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_DESCRIPTION_MIN_LENGTH,
  TASK_TITLE_MAX_LENGTH,
  TASK_TITLE_MIN_LENGTH,
} from "@daylytic/shared/constants";
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
  todoList: z.any().nullable(), // Placeholder for the ToDoList relation (to be refined)
  userId: IdSchema.nullable(), // Relation field to User
  user: z.any().nullable(), // Placeholder for the User relation (to be refined)
  tags: z.array(z.lazy((): z.ZodType<any> => TagSchema)).optional(),
  recurrencePattern: z.string().nullable(), // e.g., "daily", "weekly", "monthly", or custom logic
  recurrenceEndDate: z.date().nullable(), // When the recurrence stops
});

export const TagSchema = z.object({
  id: IdSchema,
  name: TagNameSchema,
  color: z.string(),
  tasks: z.array(z.lazy((): z.ZodType<any> => TaskSchema)).optional(),
})