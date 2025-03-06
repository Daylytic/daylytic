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

  // Fetch all tasks GET /goal/:id/project/:projectId/task
  server.route({
    url: "/",
    method: "GET",
    preHandler: [
      authController.authenticate,
      projectController.authenticateGoal,
      taskController.authenticateProject,
    ],
    handler: taskController.fetchTasks,
    schema: {
      description: "Fetch tasks from project",
      tags: ["project"],
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        200: $ref("FetchTasksResponseSchema"),
      },
    },
  });

  // Delete specific task DELETE /goal/:id/project/:projectId/task/:taskId
  server.route({
    url: "/:taskId",
    method: "DELETE",
    preHandler: [authController.authenticate, projectController.authenticateGoal,
    taskController.authenticateProject],
    handler: taskController.deleteTask,
    schema: {
      description: "Delete a specific project",
      tags: ["project"],
      headers: $refAuth("HeaderBearerSchema"),
      params: $ref("DeleteTaskParamsInputSchema"),
      response: {
        204: {
          description: "Succesfully deleted project",
        },
      }
    },
  });

  // Update specific task PUT /goal/:id/project/:projectId/task
  server.route({
    url: "/",
    method: "PUT",
    preHandler: [authController.authenticate, projectController.authenticateGoal,
    taskController.authenticateProject],
    handler: taskController.updateTask,
    schema: {
      description: "Update project",
      tags: ["project"],
      headers: $refAuth("HeaderBearerSchema"),
      body: $ref("UpdateTasksInputSchema"),
      response: {
        201: $ref("TaskSchema"),
      },
    },
  });
};
