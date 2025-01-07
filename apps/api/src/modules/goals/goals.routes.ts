import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { createGoal, deleteGoal, getGoals } from "./goals.controller.js";
import { $ref } from "./goals.schema.js";
import { authController } from "../auth/auth.controller.js";

export const goalsHandler: FastifyPluginAsync = async (server) => {
    server.route({
        url: "/", method: "GET", preHandler: authController.authenticate, handler: getGoals, schema: {
            tags: ["goals"],
            response: {
                201: $ref("goals"),
            }
        }
    });

    server.route({
        url: "/", method: "POST", preHandler: authController.authenticate, handler: createGoal, schema: {
            tags: ["goals"],
            body: $ref("goalCreateInput"),
            response: {
                201: $ref("goalCore"),
            }
        }
    });

    server.route({
        url:"/", method: "DELETE", preHandler: authController.authenticate, handler: deleteGoal, schema: {
            tags: ["goals"],
            querystring: $ref("goalDeleteInput"),
            response: {
                204: {
                    description: "Goal successfully deleted. No content returned."
                }
            }
        }
    })
}