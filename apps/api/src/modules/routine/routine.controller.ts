import { FastifyReply, FastifyRequest } from "fastify";
import { routineService } from "./routine.service.js";
import {
  CreateDailyTaskInput,
  DeleteDailyTaskInput,
  UpdateDailyTaskInput,
} from "./routine.schema.js";
import { RequestError } from "../../utils/error.js";
import { analyticsService } from "../analytics/analytics.service.js";
import { routineDataService } from "../analytics/routine/routine.service.js";

const createDailyTask = async (req: FastifyRequest, rep: FastifyReply) => {
  const userId = req.user!.id;
  const { title } = req.body as CreateDailyTaskInput;
  try {
    return await routineService.createDailyTask({
      title: title,
      userId: userId,
    });
  } catch (err) {
    if (err instanceof RequestError) {
      rep.status(err.status).send({ error: err.message });
    }

    throw err;
  }
};

const getDailyTasks = async (req: FastifyRequest, rep: FastifyReply) => {
  const userId = req.user!.id;
  try {
    return await routineService.getDailyTasks(userId);
  } catch (err) {
    if (err instanceof RequestError) {
      rep.status(err.status).send({ error: err.message });
    }
  }
};

const updateDailyTask = async (req: FastifyRequest, rep: FastifyReply) => {
  const dailyTask = req.body as UpdateDailyTaskInput;
  const userId = req.user!.id;

  try {
    return await routineService.updateDailyTask(userId, dailyTask);
  } catch (err: any) {
    if (err instanceof RequestError) {
      rep.status(err.status).send({ error: err.message });
    }
  }
};

const deleteDailyTask = async (req: FastifyRequest, rep: FastifyReply) => {
  const { id } = req.body as DeleteDailyTaskInput;
  const userId = req.user!.id;

  try {
    return await routineService.deleteDailyTask(userId, id);
  } catch (err: any) {
    if (err instanceof RequestError) {
      rep.status(err.status).send({ error: err.message });
    }
  }
};

const initializeDailyTasks = async (req: FastifyRequest, rep: FastifyReply) => {
  const user = req.user!;
  const timeZone = user.timeZone;

  // Fetch analytics and last routine reset data
  const analytics = await analyticsService.getAnalytics({ userId: user.id });
  const lastRoutineResetUTC = (await routineDataService.getRoutineData({ analyticsId: analytics.id })).lastRoutineReset;

  // Normalize dates to user's time zone and strip time components
  const normalizeToDate = (date: Date, timeZone: string) => {
    const localDate = new Date(date.toLocaleString('en-US', { timeZone }));
    return new Date(localDate.setHours(0, 0, 0, 0)); // Reset time to midnight
  };

  const lastResetDate = normalizeToDate(lastRoutineResetUTC, timeZone);
  const todayDate = normalizeToDate(new Date(), timeZone);

  console.log(`Last reset date: ${lastResetDate}, Today's date: ${todayDate}`);

  if (lastResetDate < todayDate) {
    await routineDataService.updateLastResetDate({ analyticsId: analytics.id });
    await routineService.resetDailyTasks(user.id);
  }
};
export const routineController = {
  createDailyTask,
  getDailyTasks,
  deleteDailyTask,
  initializeDailyTasks,
  updateDailyTask,
};
