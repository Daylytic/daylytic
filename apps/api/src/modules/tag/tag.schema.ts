import { buildJsonSchemas } from "fastify-zod";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

export const TagNameSchema = z.string();

// Base

export const TagSchema = z.object({
  id: IdSchema,
  name: TagNameSchema,
  color: z.string(),
  userId: IdSchema.nullable(),
  taskIds: z.array(IdSchema),
});

// Fetch Tags Schema
const FetchTagsResponseSchema = z.array(TagSchema);
const FetchTagsInputSchema = TagSchema.pick({ userId: true });
const FetchTagsWithIdsSchema = z.array(IdSchema);

// Create Tag Schema
const CreateTagSchema = TagSchema.pick({ color: true, name: true, userId: true });
const CreateTagInputSchema = TagSchema.pick({ name: true, color: true });

// Delete Tag Schema
const DeleteTagSchema = TagSchema.pick({ id: true, userId: true });
const DeleteTagInputSchema = z.object({ tagId: IdSchema })

// Update Tag Schema
const UpdateTagInputSchema = TagSchema.pick({ color: true, name: true, id: true });
const UpdateTagSchema = TagSchema.omit({ taskIds: true })
const UpdateTasksForTagSchema = z.object({
  taskId: IdSchema,
  tagIds: z.array(IdSchema)
})

export type TagSchema = z.infer<typeof TagSchema>;
export type FetchTagsResponseSchema = z.infer<typeof FetchTagsResponseSchema>;
export type FetchTagsInputSchema = z.infer<typeof FetchTagsInputSchema>;
export type FetchTagsWithIdsSchema = z.infer<typeof FetchTagsWithIdsSchema>;
export type CreateTagSchema = z.infer<
  typeof CreateTagSchema
>;
export type DeleteTagSchema = z.infer<typeof DeleteTagSchema>;
export type DeleteTagInputSchema = z.infer<typeof DeleteTagInputSchema>;
export type UpdateTagSchema = z.infer<typeof UpdateTagSchema>;
export type UpdateTagInputSchema = z.infer<typeof UpdateTagInputSchema>;
export type UpdateTasksForTagSchema = z.infer<typeof UpdateTasksForTagSchema>;


export const { schemas: tagSchemas, $ref } = buildJsonSchemas(
  {
    TagSchema,
    CreateTagInputSchema,
    DeleteTagInputSchema,
    FetchTagsResponseSchema,
    UpdateTagSchema,
    UpdateTagInputSchema,
  },
  { $id: "TagSchemas" }
);
