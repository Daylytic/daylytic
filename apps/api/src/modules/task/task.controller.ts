import { FastifyReply, FastifyRequest } from "fastify";
import { handleControllerError, RequestError } from "utils/error.js";
import { taskService } from "./task.service.js";
import {
  CreateProjectTaskInputSchema,
  DeleteTaskParamsInputSchema,
  Task,
} from "./task.schema.js";
import { GoalSchema } from "modules/goal/goal.schema.js";
import { AuthenticateProjectParamsInput, ProjectSchema } from "modules/project/project.schema.js";
import { projectService } from "modules/project/project.service.js";
import { goalService } from "modules/goal/goal.service.js";

interface TaskRequest extends FastifyRequest {
  goal?: GoalSchema;
  project?: ProjectSchema;
}

const authenticateProject = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const goal = req.goal!;
    const { projectId } = req.params as AuthenticateProjectParamsInput;

    const project = await projectService.fetchProjectWithIdAndGoalId({ goalId: goal.id, id: projectId, });
    if (!project) {
      throw new RequestError(
        "You do not have access or the goal does not exist",
        403,
        null
      );
    }

    req.project = project;
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const createTask = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const project = req.project!;
    const { title } = req.body as CreateProjectTaskInputSchema;
    return await taskService.createTask({ projectId: project.id, title, taskType: "PROJECT" });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const fetchTasks = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const project = req.project!;
    return await taskService.fetchTasks({ projectId: project.id });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const deleteTask = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const project = req.project!;
    const { taskId } = req.params as DeleteTaskParamsInputSchema;
    return await taskService.deleteTask({ projectId: project.id, id: taskId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const updateTask = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const tasks = req.body as Task[];

    //TODO: Check if we remove goalId from update input schema, whether goalId would update if user provided goalId  

    const goals = await goalService.fetchGoals({ userId });
    for (const task of tasks) {
      const project = await projectService.fetchProjectWithId({ id: task.projectId! });
      const ownsProject = goals.find((goal) => project.goalId === goal.id);

      if (!ownsProject) {
        throw new RequestError(
          "You do not have access to this task.",
          403,
          null
        );
      }
    }

    return await taskService.updateTasks({tasks, userId});
  } catch (err) {
    handleControllerError(err, rep);
  }
};

export const taskController = {
  authenticateProject,
  createTask,
  fetchTasks,
  deleteTask,
  updateTask,
};
