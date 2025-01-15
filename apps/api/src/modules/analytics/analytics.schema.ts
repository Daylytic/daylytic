import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Base

export const AnalyticsSchema = z.object({
    id: IdSchema,
    userId: IdSchema,
});

export const AnalyticsInputSchema = AnalyticsSchema.pick({
    userId: true,
});

export type AnalyticsInput = z.infer<typeof AnalyticsInputSchema>
export type Analytics = z.infer<typeof AnalyticsSchema>;