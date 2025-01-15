import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

/* CORE */

const dailyTaskCore = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    isCompleted: z.boolean(),
    userId: z.string(),
});

/* CREATE DAILY TASK */

const createDailyTaskInput = z.object({
    title: z.string(),
});

const createDailyTaskDetailed = createDailyTaskInput.extend({
    userId: z.string(),
})

const createDailyTaskResponse = dailyTaskCore;

/* FETCH DAILY TASKS */

const fetchDailyTasksResponse = z.array(dailyTaskCore);

/* DELETE DAILY TASK */

const deleteDailyTaskInput = z.object({
    id: z.string(),
});

export type DailyTaskCore = z.infer<typeof dailyTaskCore>

export type DeleteDailyTaskInput = z.infer<typeof deleteDailyTaskInput>
export type CreateDailyTaskInput = z.infer<typeof createDailyTaskInput>
export type CreateDailyTaskDetailed = z.infer<typeof createDailyTaskDetailed>

export const {schemas: routineSchemas, $ref} = buildJsonSchemas({
    createDailyTaskInput,
    createDailyTaskResponse,
    fetchDailyTasksResponse,
    deleteDailyTaskInput,
}, {$id: "RoutineSchema"})