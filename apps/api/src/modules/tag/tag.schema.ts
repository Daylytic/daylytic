import { buildJsonSchemas } from "fastify-zod";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

export const TagNameSchema = z.string();

// Base

export const TagSchema = z.object({
  id: IdSchema,
  name: TagNameSchema,
  color: z.string(),
  userId: IdSchema,
  taskIds: z.array(IdSchema),
});

// Fetch Tags Schema
const FetchTagsResponseSchema = z.array(TagSchema);
const FetchTagsInputSchema = TagSchema.pick({userId: true});
const FetchTagsWithIdsSchema = z.array(IdSchema);

// Create Tag Schema
const CreateTagSchema = TagSchema.pick({color: true, name: true, userId: true});
const CreateTagInputSchema = CreateTagSchema.omit({userId: true});

// Delete Tag Schema
const DeleteTagSchema = TagSchema.pick({id: true, userId: true});
const DeleteTagInputSchema = DeleteTagSchema.omit({userId: true});

// Update Tag Schema
const UpdateTagSchema = TagSchema.pick({color: true, name: true, id: true});

export type TagSchema = z.infer<typeof TagSchema>;
export type FetchTagsResponseSchema = z.infer<typeof FetchTagsResponseSchema>;
export type FetchTagsInputSchema = z.infer<typeof FetchTagsInputSchema>;
export type FetchTagsWithIdsSchema = z.infer<typeof FetchTagsWithIdsSchema>;
export type CreateTagSchema = z.infer<
  typeof CreateTagSchema
>;
export type DeleteTagSchema = z.infer<typeof DeleteTagSchema>;
export type UpdateTagSchema = z.infer<typeof UpdateTagSchema>;



export const { schemas: tagSchemas, $ref } = buildJsonSchemas(
  {
    TagSchema,
    CreateTagInputSchema,
    DeleteTagInputSchema,
    FetchTagsResponseSchema,
  },
  { $id: "TagSchemas" }
);
