import { RequestError } from "../../utils/error.js";
import { prisma } from "../../utils/prisma.js";
import {
  CreateDailyTaskDetailed,
  CreateDailyTaskInput,
  DailyTaskCore,
} from "./routine.schema.js";

const resetDailyTasks = async (userId: string) => {
  try {
    await prisma.dailyTask.updateMany({
      where: {
        userId: userId,
      },
      data: {
        isCompleted: false,
      },
    });
  } catch (err) {}
};

const createDailyTask = async (
  data: CreateDailyTaskDetailed
): Promise<DailyTaskCore> => {
  try {
    return await prisma.dailyTask.create({ data: data });
  } catch (err) {
    throw err;
    // throw new RequestError("Problem occured while creating daily task", 500);
  }
};

const getDailyTasks = async (userId: string): Promise<DailyTaskCore[]> => {
  return await prisma.dailyTask.findMany({
    where: {
      userId: userId,
    },
  });
};

const deleteDailyTask = async (
  userId: string,
  taskId: string
): Promise<void> => {
  try {
    await prisma.dailyTask.delete({
      where: {
        id: taskId,
        userId: userId,
      },
    });
  } catch (err) {
    throw new RequestError("Problem occured while deleting daily task", 400);
  }
};

export const routineService = {
  createDailyTask,
  getDailyTasks,
  deleteDailyTask,
};
