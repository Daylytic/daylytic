import { FastifyReply, FastifyRequest } from "fastify";
import { handleControllerError, RequestError } from "utils/error.js";
import { projectService } from "./project.service.js";
import {
  CreateProjectInputSchema,
  DeleteProjectInputSchema,
  ProjectSchema,
} from "./project.schema.js";

const createProject = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const goalId = req.user!.id;
    const { title } = req.body as CreateProjectInputSchema;
    return await projectService.createProject({ goalId, title });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const fetchProjects = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const goalId = req.user!.id;
    return await projectService.fetchProjects({ goalId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const deleteProject = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const goalId = req.user!.id;
    const { id } = req.params as DeleteProjectInputSchema;
    return await projectService.deleteProject({ goalId, id });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const updateProject = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const goalId = req.user!.id;
    const task = req.body as ProjectSchema;

    if (task.goalId !== goalId) {
      throw new RequestError("You do not have access to this project.", 403, null);
    }

    return await projectService.updateProject(task);
  } catch (err) {
    handleControllerError(err, rep);
  }
};

export const projectController = {
  createProject,
  fetchProjects,
  deleteProject,
  updateProject,
};
