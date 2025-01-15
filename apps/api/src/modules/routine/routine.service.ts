import { RequestError } from "utils/error.js";
import { prisma } from "utils/prisma.js";
import {
  CreateDailyTaskWithUserIdSchema,
  DailyTask,
  DeleteDailyTaskWithUserIdInputSchema,
  FetchDailyTaskInputSchema,
  ResetDailyTaskInputSchema,
  UpdateDailyTaskWithUserIdInputSchema,
} from "./routine.schema.js";

const resetDailyTasks = async (data: ResetDailyTaskInputSchema) => {
  try {
    await prisma.dailyTask.updateMany({
      where: data,
      data: {
        isCompleted: false,
      },
    });
  } catch (err) {
    throw new RequestError("Problem occured while resetting daily tasks", 500);
  }
};

const createDailyTask = async (
  data: CreateDailyTaskWithUserIdSchema
): Promise<DailyTask> => {
  try {
    return await prisma.dailyTask.create({ data: data });
  } catch (err) {
    throw new RequestError("Problem occured while creating daily task", 500);
  }
};

const getDailyTasks = async (data: FetchDailyTaskInputSchema): Promise<DailyTask[]> => {
  return await prisma.dailyTask.findMany({
    where: data
  });
};

const deleteDailyTask = async (data: DeleteDailyTaskWithUserIdInputSchema): Promise<void> => {
  try {
    await prisma.dailyTask.delete({
      where: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while deleting daily task", 500);
  }
};

const updateDailyTask = async (data: UpdateDailyTaskWithUserIdInputSchema) => {
  try {
    await prisma.dailyTask.update({
      where: {
        id: data.id,
        userId: data.userId,
      },
      data: {
        title: data.title,
        description: data.description,
        isCompleted: data.isCompleted,
      }
    });
  } catch (err) {
    throw new RequestError("Problem occured while updating daily task", 500);
  }
}

export const routineService = {
  resetDailyTasks,
  createDailyTask,
  getDailyTasks,
  deleteDailyTask,
  updateDailyTask,
};
