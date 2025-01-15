import { prisma } from "utils/prisma.js"
import { Analytics, AnalyticsInput } from "./analytics.schema.js";
import { routineDataService } from "./routine/routine.service.js";
import { RequestError } from "utils/error.js";

const initializeAnalytics = async (data: AnalyticsInput): Promise<Analytics> => {
    try {
        const analytics = await prisma.analytics.upsert({
            where: data,
            update: {},
            create: data,
        });
    
        await routineDataService.initializeRoutineData({ analyticsId: analytics.id });
        return analytics;
    } catch(_) {
        throw new RequestError("Problem occured while creating analytics profile", 500);
    }
};

const getAnalytics = async (data: AnalyticsInput): Promise<Analytics> => {
    try {
        return await prisma.analytics.findFirstOrThrow({where: data});
    } catch(_) {
        throw new RequestError("Problem occured while finding analytics", 500);
    }
}

export const analyticsService = {
    initializeAnalytics,
    getAnalytics,
}