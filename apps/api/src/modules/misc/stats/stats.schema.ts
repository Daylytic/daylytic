import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const StatsSchema = z.object({
  reachedGoals: z.number(),
  completedTasks: z.number(),
  completedProjects: z.number(),
});

export type StatsSchema = z.infer<typeof StatsSchema>;

export const { schemas: statsSchemas, $ref } = buildJsonSchemas(
  {
    StatsSchema
  },
  { $id: "StatsSchemas" }
);
