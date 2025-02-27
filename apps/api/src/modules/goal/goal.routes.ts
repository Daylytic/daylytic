import { FastifyPluginAsync } from "fastify";
import { goalController } from "./goal.controller.js";
import { $ref } from "./goal.schema.js";
import { $ref as $refAuth } from "modules/auth/auth.schema.js";
import { authController } from "modules/auth/auth.controller.js";

export const goalHandler: FastifyPluginAsync = async (server, _) => {
  // Create goal POST /user/goal
  server.route({
    url: "/",
    method: "POST",
    preHandler: [authController.authenticate],
    handler: goalController.createGoal,
    schema: {
      description: "Create goal",
      tags: ["goal"],
      body: $ref("CreateGoalInputSchema"),
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("GoalSchema"),
      },
    },
  });

  // Fetch all goals GET /user/goal
  server.route({
    url: "/",
    method: "GET",
    preHandler: [authController.authenticate],
    handler: goalController.fetchGoals,
    schema: {
      description: "Fetch goals",
      tags: ["goal"],
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        200: {
          type: "array",
          items: $ref("GoalSchema"),
        },
      },
    },
  });

  // Delete specific goal DELETE /user/goal/:id
  server.route({
    url: "/",
    method: "DELETE",
    preHandler: [authController.authenticate],
    handler: goalController.fetchGoals,
    schema: {
      description: "Delete a specific goal",
      tags: ["goal"],
      headers: $refAuth("HeaderBearerSchema"),
      204: {
        description: "Succesfully deleted goal",
      },
    },
  });

  // Update specific project PUT /user/goal
  server.route({
    url: "/",
    method: "PUT",
    preHandler: [authController.authenticate],
    handler: goalController.updateGoal,
    schema: {
      description: "Update goal",
      tags: ["goal"],
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("GoalSchema"),
      },
    },
  });
};
