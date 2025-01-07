import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { createGoal } from "./goals.controller.js";
import { $ref } from "./goals.schema.js";
import { authController } from "../auth/auth.controller.js";

export const goalsHandler: FastifyPluginAsync = async (server) => {
    server.route({
        url: "/", method: "POST", preHandler: authController.authenticate, handler: createGoal, schema: {
            tags: ["goals"],
            body: $ref("goalInput"),
            response: {
                201: $ref("goalResponse"),
            }
        }
    })
}