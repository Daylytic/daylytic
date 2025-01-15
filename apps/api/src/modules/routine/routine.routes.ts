import { FastifyPluginAsync } from "fastify";
import { authController } from "modules/auth/auth.controller.js";
import { $ref, routineController } from "./index.js";
import { $ref as $refAuth } from "modules/auth/auth.schema.js";

export const routineHandler: FastifyPluginAsync = async (server, _) => {
  // Create Daily Task
  server.route({
    url: "/",
    method: "POST",
    preHandler: [
      authController.authenticate,
      routineController.initializeDailyTasks,
    ],
    handler: routineController.createDailyTask,
    schema: {
      description: "Create new daily task",
      tags: ["routine"],
      body: $ref("CreateDailyTaskInputSchema"),
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("DailyTaskSchema"),
      },
    },
  });

  // Fetch Daily Tasks
  server.route({
    url: "/",
    method: "GET",
    preHandler: [
      authController.authenticate,
      routineController.initializeDailyTasks,
    ],
    handler: routineController.getDailyTasks,
    schema: {
      description: "Fetches given user tasks",
      tags: ["routine"],
      headers: $refAuth("HeaderBearerSchema"),
      response: {
        201: $ref("FetchDailyTasksResponseSchema"),
      },
    },
  });

  // Delete Daily Task
  server.route({
    url: "/",
    method: "DELETE",
    preHandler: [
      authController.authenticate,
      routineController.initializeDailyTasks,
    ],
    handler: routineController.deleteDailyTask,
    schema: {
      description: "Deletes daily task",
      tags: ["routine"],
      headers: $refAuth("HeaderBearerSchema"),
      body: $ref("DeleteDailyTaskInputSchema"),
    },
  });

  // Update Daily Task
  server.route({
    url: "/",
    method: "PUT",
    preHandler: [
      authController.authenticate,
      routineController.initializeDailyTasks,
    ],
    handler: routineController.updateDailyTask,
    schema: {
      description: "Updates the data of the daily task",
      tags: ["routine"],
      headers: $refAuth("HeaderBearerSchema"),
      body: $ref("UpdateDailyTaskInputSchema"),
      response: {
        201: $ref("DailyTaskSchema"),
      },
    },
  });
};