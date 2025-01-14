import { z } from "zod";

const routineDataInput = z.object({
    analyticsId: z.string(),
});
const routineDataCore = z.object({
    id: z.string(),
    analyticsId: z.string(),
    lastRoutineReset: z.date(),
});

export type RoutineDataCore = z.infer<typeof routineDataCore>
export type RoutineDataInput = z.infer<typeof routineDataInput>;