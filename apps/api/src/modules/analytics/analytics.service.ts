import { prisma } from "utils/prisma.js"
import { Analytics, UpdateTimelyticTimeSpentSchema, UpdateTimelyticSessionsSchema, UpdateTimelyticTasksFinishedSchema, AnalyticsInput, UpdateLastResetDataSchema, FetchLastResetDataSchema, UpdateLoginStreakSchema, UpdateRecordLoginStreakSchema, UpdateRoutineStreakSchema, UpdateRecordRoutineStreakSchema, } from "./analytics.schema.js";
import { RequestError } from "utils/error.js";
import { convertToTimeZoneISO8601 } from "utils/date.js";
import dayjs from "dayjs";

const initializeAnalytics = async (data: AnalyticsInput): Promise<Analytics> => {
    try {
        const analytics = await prisma.analytics.upsert({
            where: data,
            update: {},
            create: data,
        });

        return analytics;
    } catch (err) {
        throw new RequestError("Problem occured while creating analytics profile", 500, err);
    }
};

const updateLastResetDate = async (
    data: UpdateLastResetDataSchema
) => {
    try {
        await prisma.analytics.update({
            where: data,
            data: { lastRoutineReset: dayjs().utc().toISOString() },
        });
    } catch (err) {
        throw new RequestError("Problem occured while finding lastResetDate", 500, err);
    }
};

const updateLoginStreak = async (
    data: UpdateLoginStreakSchema
) => {
    try {
        await prisma.analytics.update({
            where: { userId: data.userId },
            data: { loginStreak: data.loginStreak },
        });
    } catch (err) {
        throw new RequestError("Problem occured while finding lastResetDate", 500, err);
    }
};

const updateRecordLoginStreak = async (
    data: UpdateRecordLoginStreakSchema
) => {
    try {
        await prisma.analytics.update({
            where: { userId: data.userId },
            data: { recordLoginStreak: data.recordLoginStreak },
        });
    } catch (err) {
        throw new RequestError("Problem occured while finding lastResetDate", 500, err);
    }
};

const updateRoutineStreak = async (
    data: UpdateRoutineStreakSchema
) => {
    try {
        await prisma.analytics.update({
            where: { userId: data.userId },
            data: { routineStreak: data.routineStreak },
        });
    } catch (err) {
        throw new RequestError("Problem occured while finding lastResetDate", 500, err);
    }
};

const updateRecordRoutineStreak = async (
    data: UpdateRecordRoutineStreakSchema
) => {
    try {
        await prisma.analytics.update({
            where: { userId: data.userId },
            data: { recordRoutineStreak: data.recordRoutineStreak },
        });
    } catch (err) {
        throw new RequestError("Problem occured while finding lastResetDate", 500, err);
    }
};

const updateTimelyticTasksFinished = async (
    data: UpdateTimelyticTasksFinishedSchema
) => {
    try {
        await prisma.analytics.update({
            where: { userId: data.userId },
            data: { timelyticTasksFinished: data.timelyticTasksFinished },
        });
    } catch (err) {
        throw new RequestError("Problem occured while finding lastResetDate", 500, err);
    }
};

const updateTimelyticSessions = async (
    data: UpdateTimelyticSessionsSchema
) => {
    try {
        await prisma.analytics.update({
            where: { userId: data.userId },
            data: { timelyticSessions: data.timelyticSessions },
        });
    } catch (err) {
        throw new RequestError("Problem occured while finding lastResetDate", 500, err);
    }
};

const updateTimelyticTimeSpent = async (
    data: UpdateTimelyticTimeSpentSchema
) => {

    try {
        await prisma.analytics.update({
            where: { userId: data.userId },
            data: { timelyticTimeSpent: data.timelyticTimeSpent },
        });
    } catch (err) {
        throw new RequestError("Problem occured while finding lastResetDate", 500, err);
    }
};

const fetchAnalyticsData = async (data: FetchLastResetDataSchema): Promise<Analytics> => {
    try {
        return await prisma.analytics.findFirstOrThrow({
            where: data,
        });
    } catch (err) {
        throw new RequestError("Problem occured while fetching analytics data", 500, err);
    }
}

export const analyticsService = {
    initializeAnalytics,
    fetchAnalyticsData,
    updateLastResetDate,
    updateLoginStreak,
    updateRecordLoginStreak,
    updateRoutineStreak,
    updateRecordRoutineStreak,
    updateTimelyticTasksFinished,
    updateTimelyticSessions,
    updateTimelyticTimeSpent,
}