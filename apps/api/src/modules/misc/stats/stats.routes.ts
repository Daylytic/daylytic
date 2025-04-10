import { FastifyPluginAsync } from "fastify";
import { $ref } from "./stats.schema.js";
import { statsController } from "modules/misc/stats/stats.controller.js";

export const statsHandler: FastifyPluginAsync = async (server, _) => {

    // Fetch Stattistics
    server.route({
        url: "/",
        method: "GET",
        handler: statsController.fetchStats,
        schema: {
            description: "Fetch statistics from Daylytic platform",
            tags: ["stats"],
            response: {
                201: $ref("StatsSchema"),
            },
        },
    });
};
