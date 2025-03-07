import { buildJsonSchemas } from "fastify-zod";
import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Base

export const ProjectSchema = z.object({
  id: IdSchema,
  position: z.number(),
  title: z.string(),
  goalId: IdSchema,
});

const AuthenticateProjectParamsInput = z.object({ goalId: IdSchema, projectId: IdSchema });
const CreateProjectInputSchema = ProjectSchema.pick({ title: true });
const CreateProjectSchema = ProjectSchema.pick({ title: true, goalId: true });
const FetchProjectsSchema = z.object({goalIds: z.array(IdSchema)});
const FetchProjectWithIdAndGoalIdSchema = ProjectSchema.pick({id: true, goalId: true});
const FetchProjectWithIdSchema = ProjectSchema.pick({id: true});
const DeleteProjectParamsInputSchema = z.object({ goalId: IdSchema, projectId: IdSchema });
const DeleteProjectSchema = z.object({ goalId: IdSchema, projectId: IdSchema });
const UpdateProjectSchema = ProjectSchema;

export type ProjectSchema = z.infer<typeof ProjectSchema>;

export type AuthenticateProjectParamsInput = z.infer<typeof AuthenticateProjectParamsInput>;
export type CreateProjectInputSchema = z.infer<typeof CreateProjectInputSchema>;
export type CreateProjectSchema = z.infer<typeof CreateProjectSchema>;
export type FetchProjectsSchema = z.infer<typeof FetchProjectsSchema>;
export type FetchProjectWithIdAndGoalIdSchema = z.infer<typeof FetchProjectWithIdAndGoalIdSchema>;
export type FetchProjectWithIdSchema = z.infer<typeof FetchProjectWithIdSchema>;
export type DeleteProjectParamsInputSchema = z.infer<typeof DeleteProjectParamsInputSchema>;
export type DeleteProjectSchema = z.infer<typeof DeleteProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof UpdateProjectSchema>;

export const { schemas: projectSchemas, $ref } = buildJsonSchemas(
  {
    ProjectSchema,
    CreateProjectInputSchema,
    DeleteProjectParamsInputSchema,
    UpdateProjectSchema,
  },
  { $id: "ProjectSchemas" }
);
