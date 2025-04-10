import { FastifyReply, FastifyRequest } from "fastify";
import { handleControllerError } from "utils/error.js";
import { analyticsService } from "modules/analytics/analytics.service.js";

const fetchAnalytics = async (req: FastifyRequest, rep: FastifyReply) => {
    const userId = req.user!.id;
    try {
        return await analyticsService.fetchAnalyticsData({ userId: userId });
    } catch (err) {
        handleControllerError(err, rep);
    }
};

export const analyticsController = {
    fetchAnalytics
}