import { FastifyPluginAsync } from "fastify";
import { authController } from "../auth/auth.controller.js";
import { $ref, routineController } from "./index.js";
import { $ref as $refAuth } from '../auth/auth.schema.js';

export const routineHandler: FastifyPluginAsync = async (server, _) => {
  /* Create task */
  server.route({
    url: "/",
    method: "POST",
    preHandler: [authController.authenticate, routineController.initializeDailyTasks],
    handler: routineController.createDailyTask,
    schema: {
      tags: ["routine"],

      body: $ref("createDailyTaskInput"),
      headers: $refAuth("headersBearer"),
      response: {
        201: $ref("createDailyTaskResponse"),
      },
    },
  });

  /* Fetch tasks */
  server.route({
    url: "/",
    method: "GET",
    preHandler: [authController.authenticate, routineController.initializeDailyTasks],
    handler: routineController.getDailyTasks,
    schema: {
      tags: ["routine"],
      headers: $refAuth("headersBearer"),
      response: {
        200: $ref("fetchDailyTasksResponse"),
      },
    },
  });

  /* Delete Task */
  server.route({
    url: "/",
    method: "DELETE",
    preHandler: [authController.authenticate, routineController.initializeDailyTasks],
    handler: routineController.deleteDailyTask,
    schema: {
      tags: ["routine"],
      headers: $refAuth("headersBearer"),
      body: $ref("deleteDailyTaskInput"),
    },
  });
};
