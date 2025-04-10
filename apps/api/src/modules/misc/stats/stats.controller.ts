import { FastifyReply, FastifyRequest } from "fastify";
import { handleControllerError, RequestError } from "utils/error.js";
import { statsService } from "modules/misc/stats/stats.service.js";

const fetchStats = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        return await statsService.fetchStats();
    } catch (err) {
        handleControllerError(err, rep);
    }
};

export const statsController = {
    fetchStats,
}