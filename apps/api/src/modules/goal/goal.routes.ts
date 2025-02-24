import { FastifyPluginAsync } from "fastify";
import { goalController } from "./goal.controller.js";
import { $ref } from "./goal.schema.js";
import {$ref as $refAuth} from "modules/auth/auth.schema.js";

export const goalHandler: FastifyPluginAsync = async (server, _) => {
    // Create Goal
    server.route({
        url: "/",
        method: "POST",
        preHandler: [],
        handler: goalController.createGoal,
        schema: {
            description: "Create goal",
            tags: ["goal"],
            body: $ref("CreateGoalInputSchema"),
            headers: $refAuth("HeaderBearerSchema"),
            response: {
                201: $ref("GoalSchema")
            }
        }
    });
}