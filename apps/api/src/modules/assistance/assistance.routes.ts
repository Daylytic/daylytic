import { FastifyPluginAsync } from "fastify";
import { authController } from "modules/auth/auth.controller.js";
import { $ref, assistanceController } from "./index.js";
import { $ref as $refAuth } from "modules/auth/auth.schema.js";

export const assistanceHandler: FastifyPluginAsync = async (server, _) => {

  // Generate Assistance
  server.route({
    url: "/",
    method: "POST",
    preHandler: [
      authController.authenticate,
    ],
    handler: assistanceController.createAssistance,
    schema: {
      description: "Create assistance",
      tags: ["assistance"],
      headers: $refAuth("HeaderBearerSchema"),
      body: $ref("QuestionResponsesSchema"),
      response: {
        201: $ref("AssistanceSchema"),
      },
    },
  });

  // Fetch Assistances
  server.route({
    url: "/",
    method: "GET",
    preHandler: [
      authController.authenticate,
    ],
    handler: assistanceController.fetchAssistances,
    schema: {
      description: "Fetch users assistances",
      tags: ["assistance"],
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("FetchAssistancesResponseSchema"),
      },
    },
  });
};
