import { FastifyReply, FastifyRequest } from "fastify";
import { routineService } from "./routine.service.js";
import {
  CreateDailyTaskInput,
  DeleteDailyTaskInput,
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
    if (err instanceof RequestError){
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
    if (err instanceof RequestError){
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
    if (err instanceof RequestError){
      rep.status(err.status).send({ error: err.message });
    }
  }
};

const getTaskDetails = async (req: FastifyRequest, rep: FastifyReply) => {};

const initializeDailyTasks = async (req: FastifyRequest, rep: FastifyReply) => {
  const user = req.user!;
  const timeZone = user.timeZone;
  const now = new Date(timeZone);

  const analytics = await analyticsService.getAnalytics({userId: user.id});

  const lastRoutineResetUTC = (await routineDataService.getRoutineData({analyticsId: analytics.id})).lastRoutineReset;
  
  const lastRoutineResetInUserTZ = new Date(lastRoutineResetUTC.toLocaleString('en-US', { timeZone }));
  const nowInUserTZ = new Date(now.toLocaleString('en-US', { timeZone }));
  
  if(lastRoutineResetInUserTZ.getDay() < nowInUserTZ.getDay()) {
    console.log("OUTDATED!");
  } else {
    console.log("NOT OUTDATED!");
  }

  console.log(`CurrentTime for user ${user}, ${now.getDay()}`);
}

export const routineController = {
  createDailyTask,
  getDailyTasks,
  deleteDailyTask,
  getTaskDetails,
  initializeDailyTasks,
};
