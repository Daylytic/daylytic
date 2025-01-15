import { z } from "zod";

// Reusable types
export const IdSchema = z.string().cuid();