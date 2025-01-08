import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const projectCreateInput = z.object({
    title: z.string(),
    description: z.string(),
    deadline: z.date(),
    goalId: z.string(),
})

const projectsCore = projectCreateInput.extend({
    id: z.string(),
    progress: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),

})

const projectsBaseQuery = z.object({
    goalId: z.string(),
    projectId: z.string(),
});

export type ProjectsBaseQuery = z.infer<typeof projectsBaseQuery>
export type CoreProject = z.infer<typeof projectsCore>
export type CreateProjectInput = z.infer<typeof projectCreateInput>

export const { schemas: projectsSchemas, $ref } = buildJsonSchemas({
    projectsBaseQuery,
}, { $id: "ProjectsSchema" })