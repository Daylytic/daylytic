import { IdSchema } from "utils/zod.js";
import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { questions } from "@daylytic/shared/constants";

// Base

const validQuestionIds = questions.map((q) => q.id);

export const DataNumberSchema = z.number().min(0);

// Define the answers schema as a record
export const QuestionResponsesSchema = z
  .record(z.union([z.string(), z.number()]))
  .superRefine((obj, ctx) => {
    const keys = Object.keys(obj);
    // Print for debugging if keys exist
    if (keys.length === 0) {
      console.log("No keys provided in questions object.");
    } else {
      keys.forEach((key) => {
        if (!validQuestionIds.includes(key)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Invalid question id: ${key}`,
            path: [key],
          });
        }
      });
    }
  });

export const AssistanceSchema = z.object({
    id: IdSchema,
    userId: IdSchema,
    response: z.string().nullable(),
    questions: QuestionResponsesSchema,
    createdAt: z.date(),
});

export const FetchAssistancesResponseSchema = z.array(AssistanceSchema);
export const FetchAssistancesInputSchema = AssistanceSchema.pick({ userId: true });
export const CreateAssistanceSchema = AssistanceSchema.pick({ questions: true, userId: true });
export const CreateAssistanceInputSchema = AssistanceSchema.pick({ questions: true });

export type AssistanceSchema = z.infer<typeof AssistanceSchema>
export type FetchAssistancesResponseSchema = z.infer<typeof FetchAssistancesResponseSchema>
export type FetchAssistancesInputSchema = z.infer<typeof FetchAssistancesInputSchema>
export type CreateAssistanceSchema = z.infer<typeof CreateAssistanceSchema>
export type CreateAssistanceInputSchema = z.infer<typeof CreateAssistanceInputSchema>
export type QuestionResponsesSchema = z.infer<typeof QuestionResponsesSchema>

export const { schemas: assistanceSchemas, $ref } = buildJsonSchemas(
    {
        AssistanceSchema,
        FetchAssistancesResponseSchema,
        CreateAssistanceInputSchema,
        QuestionResponsesSchema,
    },
    { $id: "AssistanceSchemas" }
);
