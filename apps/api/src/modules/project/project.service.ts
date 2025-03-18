import { prisma } from "utils/prisma.js";
import {
  CreateProjectSchema,
  DeleteProjectSchema,
  FetchProjectsSchema,
  FetchProjectWithIdAndGoalIdSchema,
  FetchProjectWithIdSchema,
  ProjectSchema,
  UpdateProjectsSchema,
} from "./project.schema.js";
import { RequestError } from "utils/error.js";

const createProject = async (data: CreateProjectSchema) => {
  try {
    const maxPosition = await prisma.project.aggregate({
      where: { goalId: data.goalId },
      _max: { position: true },
    });

    const newPosition = (maxPosition._max.position ?? -1) + 1;

    return await prisma.project.create({
      data: { ...data, position: newPosition },
    });
  } catch (err) {
    throw new RequestError("Problem occured while creating project", 500, err);
  }
};

const fetchProjects = async (
  data: FetchProjectsSchema
): Promise<ProjectSchema[]> => {
  try {
    return await prisma.project.findMany({
      where: {
        goalId: {
          in: data.goalIds,
        },
      },
    });
  } catch (err) {
    throw new RequestError("Problem occurred while fetching projects", 500, err);
  }
};

const fetchProjectWithIdAndGoalId = async (data: FetchProjectWithIdAndGoalIdSchema) => {
  try {
    return await prisma.project.findUniqueOrThrow({
      where: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while fetching goals with ID", 500, err);
  }
}

const fetchProjectWithId = async (data: FetchProjectWithIdSchema) => {
  try {
    return await prisma.project.findUniqueOrThrow({
      where: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while fetching goals with ID", 500, err);
  }
}

const deleteProject = async (data: DeleteProjectSchema) => {
  try {
    await prisma.task.deleteMany({
      where: { projectId: data.projectId }
    });

    return await prisma.project.delete({
      where: {
        id: data.projectId,
        goalId: data.goalId,
      },
    });
  } catch (err) {
    throw new RequestError("The project with given ID does not exist", 404, err);
  }
};

const updateProjects = async (data: UpdateProjectsSchema) => {
  try {
    for (const project of data) {
      await prisma.project.update({
        where: {
          id: project.id,
          goalId: project.goalId,
        },
        data: project,
      });
    }
  } catch (err) {
    throw new RequestError("Could not update project", 500, err);
  }
};

export const projectService = {
  createProject,
  fetchProjects,
  fetchProjectWithIdAndGoalId,
  fetchProjectWithId,
  deleteProject,
  updateProjects,
};
