import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Base
const RoutineDataSchema = z.object({
    id: IdSchema,
    analyticsId: IdSchema,
    lastRoutineReset: z.date(),
});

const RoutineDataInputSchema = RoutineDataSchema.pick({
    analyticsId: true,
});

export type RoutineData = z.infer<typeof RoutineDataSchema>
export type RoutineDataInput = z.infer<typeof RoutineDataInputSchema>;