import { IdSchema } from "utils/zod.js";
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

// Base

export const DurationSchema = z.union([
  z.literal(1000 * 60 * 30),
  z.literal(1000 * 60 * 45),
  z.literal(1000 * 60 * 60),
]).nullable();

export const TimelyticSchema = z.object({
  id: IdSchema,
  userId: IdSchema,
  deadline: z.date().nullable(),
  duration: DurationSchema,
  pausedTime: z.date().nullable(),
  isRunning: z.boolean().default(false),
});

export const TimelyticInputSchema = TimelyticSchema.pick({ userId: true });
export const UpdateTimelyticInputSchema = TimelyticSchema;
export const TimelyticWithTimeInputSchema = z.object({ time: z.string() });
export const ResetTimelyticInputSchema = TimelyticSchema.pick({ duration: true }).merge(TimelyticWithTimeInputSchema);

export type TimelyticSchema = z.infer<typeof TimelyticSchema>;
export type TimelyticInputSchema = z.infer<typeof TimelyticInputSchema>;
export type UpdateTimelyticInputSchema = z.infer<typeof UpdateTimelyticInputSchema>;
export type ResetTimelyticInputSchema = z.infer<typeof ResetTimelyticInputSchema>;
export type TimelyticWithTimeInputSchema = z.infer<typeof TimelyticWithTimeInputSchema>;

export const { schemas: timelyticSchemas, $ref } = buildJsonSchemas(
  {
    TimelyticSchema,
    UpdateTimelyticInputSchema,
    ResetTimelyticInputSchema,
    TimelyticWithTimeInputSchema
  },
  { $id: "TimelyticSchemas" }
);
