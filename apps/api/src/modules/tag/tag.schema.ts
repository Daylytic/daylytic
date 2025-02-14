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

// Create Tag Schema
const CreateTagSchema = TagSchema.pick({color: true, name: true, userId: true});
const CreateTagInputSchema = CreateTagSchema.omit({userId: true});

// Delete Tag Schema
const DeleteTagSchema = TagSchema.pick({id: true, userId: true});
const DeleteTagInputSchema = DeleteTagSchema.omit({userId: true});

// Update Tag Schema
const UpdateTagSchema = TagSchema.pick({color: true, name: true, id: true});

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

  },
  { $id: "TagSchemas" }
);
