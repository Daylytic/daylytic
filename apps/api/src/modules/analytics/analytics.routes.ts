import { FastifyPluginAsync } from "fastify";
import { authController } from "modules/auth/auth.controller.js";
import { $ref, analyticsController } from "./index.js";
import { $ref as $refAuth } from "modules/auth/auth.schema.js";

export const analyticsHandler: FastifyPluginAsync = async (server, _) => {

  // Fetch Analytics
  server.route({
    url: "/",
    method: "GET",
    preHandler: [
      authController.authenticate,
    ],
    handler: analyticsController.fetchAnalytics,
    schema: {
      description: "Fetches given user tasks",
      tags: ["analytics"],
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("AnalyticsSchema"),
      },
    },
  });
};
