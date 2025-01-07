import { buildJsonSchemas } from "fastify-zod";
import {z} from "zod";

const projectsQuery = z.object({
    goalId: z.string()
});

export type ProjectsQuery = z.infer<typeof projectsQuery>

export const {schemas: projectsSchemas, $ref} = buildJsonSchemas({
    projectsQuery,
}, {$id: "ProjectsSchema"})