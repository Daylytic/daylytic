import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { createGoal } from "./goals.controller.js";
import { $ref } from "./goals.schema.js";

export const goalsHandler: FastifyPluginAsync = async (server) => {
    server.route({ url: "/", method: "POST", handler: createGoal, schema: {
        body: $ref("goalInput"),
        response: {
            201: $ref("goalResponse"),
        }
    } })
}