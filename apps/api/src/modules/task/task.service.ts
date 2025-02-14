import { RequestError } from "utils/error.js";
import { prisma } from "utils/prisma.js";
import {
  CreateTaskWithIdSchema,
  Task,
  DeleteTaskWithIdInputSchema,
  FetchTasksInputSchema,
  UpdateTaskWithIdInputSchema,
  UpdateTaskInputSchema,
} from "./task.schema.js";
import { convertToTimeZoneISO8601 } from "utils/date.js";

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

const getTasks = async (data: FetchTasksInputSchema): Promise<Task[]> => {
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

const updateTask = async (data: UpdateTaskInputSchema) => {
  try {
    return await prisma.task.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
        updatedAt: convertToTimeZoneISO8601(),
      },
    });
  } catch (err) {
    throw new RequestError(`Problem occurred while updating task`, 500, err);
  }
};

export const taskService = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
};
