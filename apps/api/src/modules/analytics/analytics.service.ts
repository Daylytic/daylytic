import { prisma } from "../../utils/prisma.js"
import { routineService } from "../routine/routine.service.js";
import { AnalyticsCore, AnalyticsInput } from "./analytics.schema.js";
import { routineDataService } from "./routine/routine.service.js";

const initializeAnalytics = async (data: AnalyticsInput) => {
    const analytics = await prisma.analytics.create({data: data});
    
    routineDataService.initializeRoutineData({analyticsId: analytics.id})
}

const getAnalytics = async (data: AnalyticsInput): Promise<AnalyticsCore> => {
    try {
        return await prisma.analytics.findFirstOrThrow({where: data});
    } catch(err) {
        throw err;
    }
}

export const analyticsService = {
    initializeAnalytics,
    getAnalytics,
}