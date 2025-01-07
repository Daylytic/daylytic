import { FastifyPluginAsync } from "fastify";
import { projectsController } from "./projects.controller.js";
import { authController } from "../auth/auth.controller.js";
import { $ref } from "./projects.schema.js";

export const projectsHandler: FastifyPluginAsync = async (server) => {
    // Get /projects&goalsId=
    server.route({
        url: "/", method: "GET", preHandler: [authController.authenticate, projectsController.verifyGoalId], handler: projectsController.getProjects, schema: {
            querystring: $ref("projectsQuery")
        }
    })
}