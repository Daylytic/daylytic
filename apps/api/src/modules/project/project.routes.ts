import { FastifyPluginAsync } from "fastify";
import { projectController } from "./project.controller.js";
import { $ref } from "./project.schema.js";
import { $ref as $refAuth } from "modules/auth/auth.schema.js";
import { authController } from "modules/auth/auth.controller.js";

export const projectHandler: FastifyPluginAsync = async (server, _) => {
  // Create project POST /goal/:goalId/project
  server.route({
    url: "/",
    method: "POST",
    preHandler: [
      authController.authenticate,
      projectController.authenticateGoal,
    ],
    handler: projectController.createProject,
    schema: {
      description: "Create project",
      tags: ["project"],
      body: $ref("CreateProjectInputSchema"),
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("ProjectSchema"),
      },
    },
  });

  // Fetch all projects GET /goal/:id/project
  server.route({
    url: "/",
    method: "GET",
    preHandler: [authController.authenticate, projectController.authenticateGoal],
    handler: projectController.fetchProjects,
    schema: {
      description: "Fetch projects",
      tags: ["project"],
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        200: {
          type: "array",
          items: $ref("ProjectSchema"),
        },
      },
    },
  });

  // Delete specific project DELETE /goal/:id/project/:id
  server.route({
    url: "/:projectId",
    method: "DELETE",
    preHandler: [authController.authenticate, projectController.authenticateGoal],
    handler: projectController.deleteProject,
    schema: {
      description: "Delete a specific project",
      tags: ["project"],
      headers: $refAuth("HeaderBearerSchema"),
      params: $ref("DeleteProjectParamsInputSchema"),
      response: {
        204: {
          description: "Succesfully deleted project",
        },
      }
    },
  });

  // Update specific project PUT /goal/:id/project
  server.route({
    url: "/",
    method: "PUT",
    preHandler: [authController.authenticate, projectController.authenticateGoal],
    handler: projectController.updateProject,
    schema: {
      description: "Update project",
      tags: ["project"],
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("ProjectSchema"),
      },
    },
  });
};
