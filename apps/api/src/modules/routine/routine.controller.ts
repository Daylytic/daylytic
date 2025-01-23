import { FastifyReply, FastifyRequest } from "fastify";
import { routineService } from "./routine.service.js";
import { RequestError } from "utils/error.js";
import { analyticsService } from "modules/analytics/analytics.service.js";
import { routineDataService } from "modules/analytics/routine/routine.service.js";
import { taskService } from "modules/task/task.service.js";
import {
  CreateTaskInputSchema,
  DeleteTaskInputSchema,
  UpdateTaskInputSchema,
} from "modules/task/task.schema.js";

const createDailyTask = async (req: FastifyRequest, rep: FastifyReply) => {
  const userId = req.user!.id;
  const { title } = req.body as CreateTaskInputSchema;
  try {
    return await taskService.createTask({
      title: title,
      userId: userId,
      taskType: "ROUTINE",
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
    return await taskService.getTasks({ userId: userId });
  } catch (err) {
    if (err instanceof RequestError) {
      return rep.status(err.status).send({ error: err.message });
    }

    console.error(err);
    rep.status(500).send();
  }
};

const updateDailyTask = async (req: FastifyRequest, rep: FastifyReply) => {
  const dailyTask = req.body as UpdateTaskInputSchema;

  try {
    return await taskService.updateTask(dailyTask);
  } catch (err: any) {
    if (err instanceof RequestError) {
      return rep.status(err.status).send({ error: err.message });
    }

    console.error(err);
    rep.status(500).send();
  }
};

const deleteDailyTask = async (req: FastifyRequest, rep: FastifyReply) => {
  const { id } = req.body as DeleteTaskInputSchema;
  const userId = req.user!.id;

  try {
    return await taskService.deleteTask({ userId, id });
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
  const lastRoutineResetUTC = (
    await routineDataService.getRoutineData({ analyticsId: analytics.id })
  ).lastRoutineReset;

  // Normalize dates to user's time zone and strip time components
  const normalizeToDate = (date: Date, timeZone: string) => {
    const localDate = new Date(date.toLocaleString("en-US", { timeZone }));
    return new Date(localDate.setHours(0, 0, 0, 0)); // Reset time to midnight
  };

  const lastResetDate = normalizeToDate(lastRoutineResetUTC, timeZone);
  const todayDate = normalizeToDate(new Date(), timeZone);

  if (lastResetDate < todayDate) {
    await routineDataService.updateLastResetDate({ analyticsId: analytics.id });
    await routineService.resetDailyTasks({ id: user.id });
  }
};
export const routineController = {
  createDailyTask,
  getDailyTasks,
  deleteDailyTask,
  initializeDailyTasks,
  updateDailyTask,
};
