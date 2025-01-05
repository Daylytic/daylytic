import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { createGoal } from "./goals.controller.js";

export const goalsHandler: FastifyPluginAsync = async (server, options) => {
    server.route({ url: "/", method: "POST", handler: createGoal })
}