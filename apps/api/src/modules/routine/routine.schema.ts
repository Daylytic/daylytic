import { IdSchema } from "utils/zod.js";
import { z } from "zod";

// Reset Daily Task Schema
const ResetDailyTaskInputSchema = z.object({
  id: IdSchema,
});

export type ResetDailyTaskInputSchema = z.infer<
  typeof ResetDailyTaskInputSchema
>;
