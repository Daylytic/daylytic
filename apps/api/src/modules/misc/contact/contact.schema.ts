import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";

export const ContactInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string().min(1),
});

export type ContactInputSchema = z.infer<typeof ContactInputSchema>;

export const { schemas: contactSchemas, $ref } = buildJsonSchemas(
  {
    ContactInputSchema
  },
  { $id: "ContactSchema" }
);
