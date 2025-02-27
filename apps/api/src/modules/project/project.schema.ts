import { buildJsonSchemas } from "fastify-zod";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Base

const ProjectSchema = z.object({
    id: IdSchema,
    title: z.string(),
    goalId: IdSchema,
});

const CreateProjectInputSchema = ProjectSchema.pick({title: true});
const CreateProjectSchema = ProjectSchema.pick({title: true, goalId: true});
const FetchProjectsSchema = ProjectSchema.pick({goalId: true});
const DeleteProjectInputSchema = ProjectSchema.pick({id: true});
const DeleteProjectSchema = ProjectSchema.pick({id: true, goalId: true});
const UpdateProjectSchema = ProjectSchema;

export type ProjectSchema = z.infer<typeof ProjectSchema>;

export type CreateProjectInputSchema = z.infer<typeof CreateProjectInputSchema>;
export type CreateProjectSchema = z.infer<typeof CreateProjectSchema>;
export type FetchProjectsSchema = z.infer<typeof FetchProjectsSchema>;
export type DeleteProjectInputSchema = z.infer<typeof DeleteProjectInputSchema>;
export type DeleteProjectSchema = z.infer<typeof DeleteProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof UpdateProjectSchema>;

export const { schemas: projectSchemas, $ref } = buildJsonSchemas(
    {
      ProjectSchema,
      CreateProjectInputSchema,
      DeleteProjectInputSchema,
      UpdateProjectSchema,
    },
    { $id: "ProjectSchemas" }
  );
  