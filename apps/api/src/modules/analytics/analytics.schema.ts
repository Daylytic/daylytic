import { IdSchema } from "utils/zod.js";
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

// Base

export const DataNumberSchema = z.number().min(0);

export const AnalyticsSchema = z.object({
    id: IdSchema,
    userId: IdSchema,
    lastRoutineReset: z.date(),
    loginStreak: DataNumberSchema,
    recordLoginStreak: DataNumberSchema,
    routineStreak: DataNumberSchema,
    recordRoutineStreak: DataNumberSchema,
    timelyticTasksFinished: DataNumberSchema,
    timelyticTimeSpent: DataNumberSchema,
    timelyticSessions: DataNumberSchema,
});

export const AnalyticsInputSchema = AnalyticsSchema.pick({
    userId: true,
});

const UpdateLastResetDataSchema = AnalyticsSchema.pick({
    userId: true,
});

const FetchLastResetDataSchema = AnalyticsSchema.pick({
    userId: true,
});

const UpdateLoginStreakSchema = AnalyticsSchema.pick({
    userId: true,
    loginStreak: true,
});

const UpdateRecordLoginStreakSchema = AnalyticsSchema.pick({
    userId: true,
    recordLoginStreak: true,
});

const UpdateRoutineStreakSchema = AnalyticsSchema.pick({
    userId: true,
    routineStreak: true,
});

const UpdateRecordRoutineStreakSchema = AnalyticsSchema.pick({
    userId: true,
    recordRoutineStreak: true,
});

const UpdateTimelyticTasksFinishedSchema = AnalyticsSchema.pick({
    userId: true,
    timelyticTasksFinished: true,
});

const UpdateTimelyticSessionsSchema = AnalyticsSchema.pick({
    userId: true,
    timelyticSessions: true,
});

const UpdateTimelyticTimeSpentSchema = AnalyticsSchema.pick({
    userId: true,
    timelyticTimeSpent: true,
});

export type AnalyticsInput = z.infer<typeof AnalyticsInputSchema>
export type Analytics = z.infer<typeof AnalyticsSchema>;
export type UpdateLastResetDataSchema = z.infer<typeof UpdateLastResetDataSchema>;
export type FetchLastResetDataSchema = z.infer<typeof FetchLastResetDataSchema>;
export type UpdateLoginStreakSchema = z.infer<typeof UpdateLoginStreakSchema>;
export type UpdateRecordLoginStreakSchema = z.infer<typeof UpdateRecordLoginStreakSchema>;

export type UpdateRoutineStreakSchema = z.infer<typeof UpdateRoutineStreakSchema>;
export type UpdateRecordRoutineStreakSchema = z.infer<typeof UpdateRecordRoutineStreakSchema>;
export type UpdateTimelyticTasksFinishedSchema = z.infer<typeof UpdateTimelyticTasksFinishedSchema>;
export type UpdateTimelyticSessionsSchema = z.infer<typeof UpdateTimelyticSessionsSchema>;
export type UpdateTimelyticTimeSpentSchema = z.infer<typeof UpdateTimelyticTimeSpentSchema>;

export const { schemas: analyticsSchemas, $ref } = buildJsonSchemas(
    {
      AnalyticsSchema,
    },
    { $id: "AnalyticsSchemas" }
  );
  