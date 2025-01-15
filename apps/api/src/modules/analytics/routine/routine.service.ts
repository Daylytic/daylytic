import { convertToTimeZoneISO8601 } from "../../../utils/date.js";
import { prisma } from "../../../utils/prisma.js";
import { RoutineDataCore, RoutineDataInput } from "./routine.schema.js";

const initializeRoutineData = async (data: RoutineDataInput) => {
  await prisma.routineData.upsert({
    where: { analyticsId: data.analyticsId },
    update: {},
    create: data,
  });
};

const getRoutineData = async (data: RoutineDataInput): Promise<RoutineDataCore> => {
  try {
    return await prisma.routineData.findFirstOrThrow({
      where: { analyticsId: data.analyticsId },
    });
  } catch (err) {
    throw err;
  }
};

const updateLastResetDate = async (data: RoutineDataInput): Promise<RoutineDataCore> => {
  const now = convertToTimeZoneISO8601();
  return await prisma.routineData.update({
    where: { analyticsId: data.analyticsId },
    data: { lastRoutineReset: now }
  });
}

export const routineDataService = {
  initializeRoutineData,
  getRoutineData,
  updateLastResetDate,
};
