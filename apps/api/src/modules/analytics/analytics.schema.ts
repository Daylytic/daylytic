import { z } from "zod";

export const analyticsInput = z.object({
    userId: z.string(),
});

export const analyticsCore = analyticsInput.extend({
    id: z.string(),
});

export type AnalyticsInput = z.infer<typeof analyticsInput>
export type AnalyticsCore = z.infer<typeof analyticsCore>;