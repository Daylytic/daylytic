import { prisma } from "utils/prisma.js";
import {
  CreateProjectSchema,
  DeleteProjectSchema,
  FetchProjectsSchema,
  ProjectSchema,
  UpdateProjectSchema,
} from "./project.schema.js";
import { RequestError } from "utils/error.js";

const createProject = async (data: CreateProjectSchema) => {
  try {
    await prisma.project.create({
      data: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while creating project", 500, err);
  }
};

const fetchProjects = async (
  data: FetchProjectsSchema
): Promise<ProjectSchema[]> => {
  return await prisma.project.findMany({
    where: data,
  });
};

const deleteProject = async (data: DeleteProjectSchema) => {
  try {
    return await prisma.project.delete({
      where: data,
    });
  } catch (err) {
    throw new RequestError("The task with given ID does not exist", 404, err);
  }
};

const updateProject = async (data: UpdateProjectSchema) => {
  try {
    return await prisma.project.update({
      where: {
        id: data.id,
        goalId: data.goalId,
      },
      data: data,
    });
  } catch (err) {
    throw new RequestError("Could not update task", 500, err);
  }
};

export const projectService = {
  createProject,
  fetchProjects,
  deleteProject,
  updateProject,
};
