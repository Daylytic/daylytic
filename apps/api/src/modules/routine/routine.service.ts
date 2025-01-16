import { RequestError } from "utils/error.js";
import { prisma } from "utils/prisma.js";
import { ResetDailyTaskInputSchema } from "./routine.schema.js";

const resetDailyTasks = async (data: ResetDailyTaskInputSchema) => {
  try {
    await prisma.task.updateMany({
      where: data,
      type
      data: {
        isCompleted: false,
      },
    });
  } catch (err) {
    throw new RequestError("Problem occured while resetting daily tasks", 500);
  }
};

export const routineService = {
  resetDailyTasks,
};
