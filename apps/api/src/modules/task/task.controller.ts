import { FastifyReply, FastifyRequest } from "fastify";
import { handleControllerError, RequestError } from "utils/error.js";
import { taskService } from "./task.service.js";
import {
  CreateTaskWithIdsSchema,
  DeleteTaskInputSchema,
  DeleteTaskParamsInputSchema,
  Task,
} from "./task.schema.js";
import { GoalSchema } from "modules/goal/goal.schema.js";
import { ProjectSchema } from "modules/project/project.schema.js";
import { projectService } from "modules/project/project.service.js";

interface TaskRequest extends FastifyRequest {
  goal?: GoalSchema;
  project?: ProjectSchema;
}

const createTask = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const user = req.user!;
    const { title, projectId, userId, taskType } = req.body as CreateTaskWithIdsSchema;

    if ((!projectId && !userId) || (projectId && userId) || (projectId && taskType === "ROUTINE") || (userId && taskType === "PROJECT")) {
      throw new RequestError("You need to provide either projectId or userId to create a task", 403, null)
    }

    if (projectId) {
      const projects = await projectService.fetchProjectsForUser({ userId: user.id });

      if (projects.findIndex((project) => project.id === projectId) === -1) {
        throw new RequestError("You don't own selected project", 403, null)
      }
    }

    return await taskService.createTask({ projectId, userId, title, taskType });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const fetchTasks = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    return await taskService.fetchUserTasks({ userId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const fetchRoutineTasks = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    return await taskService.fetchRoutineTasks({ userId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const deleteTask = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const { taskId } = req.params as DeleteTaskParamsInputSchema;

    const tasks = await taskService.fetchUserTasks({ userId });
    if (!tasks.find((task) => task.id === taskId)) {
      throw new RequestError("You don't have access to this task", 403, null)
    }

    return await taskService.deleteTask({ id: taskId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const updateTask = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const user = req.user!;
    const tasks = req.body as Task[];
    return await taskService.updateTasks({ tasks, user });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

export const taskController = {
  createTask,
  fetchTasks,
  fetchRoutineTasks,
  deleteTask,
  updateTask,
};
