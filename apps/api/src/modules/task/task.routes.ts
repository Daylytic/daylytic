import { FastifyPluginAsync } from "fastify";
import { $ref } from "./task.schema.js";
import { $ref as $refAuth } from "modules/auth/auth.schema.js";
import { authController } from "modules/auth/auth.controller.js";
import { taskController } from "./task.controller.js";
import { projectController } from "modules/project/project.controller.js";

export const taskHandler: FastifyPluginAsync = async (server, _) => {
  // Create task POST /goal/:goalId/project/:projectId/task
  server.route({
    url: "/",
    method: "POST",
    preHandler: [
      authController.authenticate,
      projectController.authenticateGoal,
      taskController.authenticateProject,
    ],
    handler: taskController.createTask,
    schema: {
      description: "Create task",
      tags: ["project"],
      body: $ref("CreateProjectTaskInputSchema"),
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("TaskSchema"),
      },
    },
  });

  // Fetch all projects GET /user/goal/:id/project/:projectId/task
  server.route({
    url: "/",
    method: "GET",
    preHandler: [
      authController.authenticate,
      taskController.authenticateProject,
    ],
    handler: taskController.fetchTasks,
    schema: {
      description: "Fetch tasks",
      tags: ["project"],
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        200: {
          type: "array",
          items: $ref("TaskSchema"),
        },
      },
    },
  });

  // // Delete specific project DELETE /user/goal/:id/project/:projectId/task/:taskId
  // server.route({
  //   url: "/",
  //   method: "DELETE",
  //   preHandler: [authController.authenticate, projectController.authenticateGoal],
  //   handler: projectController.deleteProject,
  //   schema: {
  //     description: "Delete a specific project",
  //     tags: ["project"],
  //     headers: $refAuth("HeaderBearerSchema"),
  //     params: $ref("DeleteProjectParamsInputSchema"),
  //     204: {
  //       description: "Succesfully deleted project",
  //     },
  //   },
  // });

  // // Update specific project PUT /user/goal/:id/project/:projectId/task
  // server.route({
  //   url: "/",
  //   method: "PUT",
  //   preHandler: [authController.authenticate, projectController.authenticateGoal],
  //   handler: projectController.updateProject,
  //   schema: {
  //     description: "Update project",
  //     tags: ["project"],
  //     headers: $refAuth("HeaderBearerSchema"),
  //     response: {
  //       201: $ref("ProjectSchema"),
  //     },
  //   },
  // });
};
