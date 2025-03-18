import { FastifyReply, FastifyRequest } from "fastify";
import { handleControllerError, RequestError } from "utils/error.js";
import { projectService } from "./project.service.js";
import {
  CreateProjectInputSchema,
  DeleteProjectParamsInputSchema,
  ProjectSchema,
  UpdateProjectsSchema,
} from "./project.schema.js";
import { goalService } from "modules/goal/goal.service.js";
import { AuthenticateGoalParamsInput, GoalSchema } from "modules/goal/goal.schema.js";

interface ProjectRequest extends FastifyRequest {
  goal?: GoalSchema;
}

const authenticateGoal = async (req: ProjectRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const { goalId } = req.params as AuthenticateGoalParamsInput;

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

const createProject = async (req: ProjectRequest, rep: FastifyReply) => {
  try {
    const goal = req.goal!;
    const { title } = req.body as CreateProjectInputSchema;
    return await projectService.createProject({ goalId: goal.id, title });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const fetchProjects = async (req: ProjectRequest, rep: FastifyReply) => {
  try {
    const goal = req.goal!;
    return await projectService.fetchProjects({ goalIds: [goal.id] });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const deleteProject = async (req: ProjectRequest, rep: FastifyReply) => {
  try {
    const goal = req.goal!;
    const { projectId } = req.params as DeleteProjectParamsInputSchema;

    await projectService.deleteProject({ goalId: goal.id, projectId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const updateProjects = async (req: ProjectRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id!;
    const projects = req.body as UpdateProjectsSchema;
    const ownedGoals = await goalService.fetchGoals({ userId });
    const projectsToUpdate = [];

    for (const project of projects) {
      if (ownedGoals.find((goal) => goal.id === project.goalId)) {
        projectsToUpdate.push(project);
      } else {
        throw new RequestError(
          "You do not have access to all of the projects.",
          403,
          null
        );
      }
    }

    return await projectService.updateProjects(projectsToUpdate);
  } catch (err) {
    handleControllerError(err, rep);
  }
};

export const projectController = {
  authenticateGoal,
  createProject,
  fetchProjects,
  deleteProject,
  updateProjects,
};
