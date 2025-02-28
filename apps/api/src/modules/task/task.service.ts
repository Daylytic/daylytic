import { RequestError } from "utils/error.js";
import { prisma } from "utils/prisma.js";
import {
  CreateTaskWithIdSchema,
  Task,
  DeleteTaskWithIdInputSchema,
  FetchTasksInputSchema,
  UpdateTasksSchema,
} from "./task.schema.js";
import { convertToTimeZoneISO8601 } from "utils/date.js";
import { tagService } from "modules/tag/index.js";

const createTask = async (data: CreateTaskWithIdSchema): Promise<Task> => {
  try {
    const maxPosition = await prisma.task.aggregate({
      where: { userId: data.userId },
      _max: { position: true },
    });

    const newPosition = (maxPosition._max.position ?? -1) + 1;

    return await prisma.task.create({
      data: { ...data, position: newPosition, content: {} },
    });
  } catch (err) {
    throw new RequestError("Problem occured while creating task", 500, err);
  }
};

const fetchTasks = async (data: FetchTasksInputSchema): Promise<Task[]> => {
  return await prisma.task.findMany({
    where: data,
  });
};

const deleteTask = async (data: DeleteTaskWithIdInputSchema): Promise<void> => {
  try {
    await prisma.task.delete({
      where: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while deleting task", 500, err);
  }
};

const updateTasks = async (data: UpdateTasksSchema) => {
  try {
    if(!data.userId && !data.projectId) {
      throw new RequestError("Neither userId nor projectId were provided", 400, null);
    }

    const updatedTasks: Task[] = [];

    for(const dataRow of data.tasks) {
      const tagIds = dataRow.tagIds;

      const tags = await tagService.fetchTagsWithIds(tagIds);
      await tagService.updateTasks({tagIds: tags.map((tag) => tag.id), taskId: dataRow.id})
      
      updatedTasks.push(
        await prisma.task.update({
          where: {
            id: dataRow.id,
            userId: data.userId,
            projectId: data.projectId,
          },
          data: {
            ...dataRow,
            tagIds: tags.map((tag) => tag.id),
            updatedAt: convertToTimeZoneISO8601(),
          },
        })
      );
    }
    return updatedTasks;
  } catch (err) {
    throw new RequestError(`Problem occurred while updating task`, 500, err);
  }
};

export const taskService = {
  createTask,
  fetchTasks,
  deleteTask,
  updateTasks,
};
