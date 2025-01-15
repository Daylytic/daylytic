import { FastifyReply, FastifyRequest } from "fastify";
import { routineService } from "./routine.service.js";
import {
  CreateDailyTaskInputSchema,
  DeleteDailyTaskInputSchema,
  UpdateDailyTaskInputSchema,
} from "./routine.schema.js";
import { RequestError } from "utils/error.js";
import { analyticsService } from "modules/analytics/analytics.service.js";
import { routineDataService } from "modules/analytics/routine/routine.service.js";

const createDailyTask = async (req: FastifyRequest, rep: FastifyReply) => {
  const userId = req.user!.id;
  const { title } = req.body as CreateDailyTaskInputSchema;
  try {
    return await routineService.createDailyTask({
      title: title,
      userId: userId,
    });
  } catch (err) {
    if (err instanceof RequestError) {
      return rep.status(err.status).send({ error: err.message });
    }

    console.error(err);
    rep.status(500).send();
  }
};

const getDailyTasks = async (req: FastifyRequest, rep: FastifyReply) => {
  const userId = req.user!.id;
  try {
    return await routineService.getDailyTasks({id: userId});
  } catch (err) {
    if (err instanceof RequestError) {
      return rep.status(err.status).send({ error: err.message });
    }

    console.error(err);
    rep.status(500).send();
  }
};

const updateDailyTask = async (req: FastifyRequest, rep: FastifyReply) => {
  const dailyTask = req.body as UpdateDailyTaskInputSchema;
  const userId = req.user!.id;

  try {
    return await routineService.updateDailyTask({userId, ...dailyTask});
  } catch (err: any) {
    if (err instanceof RequestError) {
      return rep.status(err.status).send({ error: err.message });
    }

    console.error(err);
    rep.status(500).send();
  }
};

const deleteDailyTask = async (req: FastifyRequest, rep: FastifyReply) => {
  const { id } = req.body as DeleteDailyTaskInputSchema;
  const userId = req.user!.id;

  try {
    return await routineService.deleteDailyTask({userId, id});
  } catch (err: any) {
    if (err instanceof RequestError) {
      return rep.status(err.status).send({ error: err.message });
    }

    console.error(err);
    rep.status(500).send();
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

  if (lastResetDate < todayDate) {
    await routineDataService.updateLastResetDate({ analyticsId: analytics.id });
    await routineService.resetDailyTasks({id: user.id});
  }
};
export const routineController = {
  createDailyTask,
  getDailyTasks,
  deleteDailyTask,
  initializeDailyTasks,
  updateDailyTask,
};
