import { RequestError } from "utils/error.js";
import { prisma } from "utils/prisma.js";
import {
  CreateTaskWithIdSchema,
  Task,
  DeleteTaskWithIdInputSchema,
  FetchTaskInputSchema,
  UpdateTaskWithIdInputSchema,
} from "./task.schema.js";

const createTask = async (data: CreateTaskWithIdSchema): Promise<Task> => {
  try {
    return await prisma.task.create({
      data: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while creating task", 500);
  }
};

const getTasks = async (data: FetchTaskInputSchema): Promise<Task[]> => {
  return await prisma.task.findMany({
    where: data,
    include: {
      tags: true,
    },
  });
};

const deleteTask = async (data: DeleteTaskWithIdInputSchema): Promise<void> => {
  try {
    await prisma.task.delete({
      where: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while deleting task", 500);
  }
};

const updateTask = async (data: UpdateTaskWithIdInputSchema) => {
  try {
    let tagsToDisconnect = [] as string[];
    let tagsToConnect = [] as string[];

    if (data.tagIds != undefined) {
      const currentTagIds = data.tagIds;

      // Determine which tags to disconnect and connect

      tagsToDisconnect = data.tagIds.filter(
        (tagId) => !data.tagIds!.includes(tagId)
      );
      tagsToConnect = data.tagIds!.filter(
        (tagId) => !currentTagIds.includes(tagId)
      );
    }

    await prisma.task.update({
      where: {
        id: data.id,
        userId: data.userId,
      },
      data: {
        title: data.title,
        description: data.description,
        isCompleted: data.isCompleted,
        tags: {
          disconnect: tagsToDisconnect.map(tagId => ({ id: tagId })), // Remove unneeded tags
          connect: tagsToConnect.map(tagId => ({ id: tagId })), // Add new tags
        }
      },
    });
  } catch (err) {
    throw new RequestError("Problem occured while updating task", 500);
  }
};

export const taskService = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
};
