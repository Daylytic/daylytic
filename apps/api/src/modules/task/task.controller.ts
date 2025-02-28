import { FastifyReply, FastifyRequest } from "fastify";
import { handleControllerError, RequestError } from "utils/error.js";
import { taskService } from "./task.service.js";
import {
  CreateTaskInputSchema,
  DeleteTaskParamsInputSchema,
  Task,
} from "./task.schema.js";
import { goalService } from "modules/goal/goal.service.js";
import { GoalSchema } from "modules/goal/goal.schema.js";
import { AuthenticateProjectParamsInput, ProjectSchema } from "modules/project/project.schema.js";

interface TaskRequest extends FastifyRequest {
  goal?: GoalSchema;
  project?: ProjectSchema;
}

const authenticateProject = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const { goalId, projectId } = req.params as AuthenticateProjectParamsInput;

    const goal = await goalService.fetchGoalWithId({ id: goalId, userId });
    if (!goal) {
      throw new RequestError(
        "You do not have access or the goal does not exist",
        403,
        null
      );
    }

    req.goal = goal;
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const createTask = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const project = req.project!;
    const { title } = req.body as CreateTaskInputSchema;
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
    const goal = req.goal!;
    const { id } = req.params as DeleteTaskParamsInputSchema;
    return await taskService.deleteTask({ projectId: goal.id, id });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const updateTask = async (req: TaskRequest, rep: FastifyReply) => {
  try {
    const project = req.project!;
    const tasks = req.body as Task[];

    //TODO: Check if we remove goalId from update input schema, whether goalId would update if user provided goalId
    //TODO: Add check for ownership of project provided in the tasks    
    // if (task.projectId !== project.id) {
    //   throw new RequestError(
    //     "You do not have access to this task.",
    //     403,
    //     null
    //   );
    // }

    return await taskService.updateTasks({projectId: project.id, tasks});
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
