import { RequestError } from "utils/error.js";
import { convertToTimeZoneISO8601 } from "../../../utils/date.js";
import { prisma } from "../../../utils/prisma.js";
import { RoutineData, RoutineDataInput } from "./routine.schema.js";

const initializeRoutineData = async (
  data: RoutineDataInput
): Promise<RoutineData> => {
  try {
    return await prisma.routineData.upsert({
      where: { analyticsId: data.analyticsId },
      update: {},
      create: data,
    });
  } catch (_) {
    throw new RequestError(
      "Problem occured while creating routine data profile",
      500
    );
  }
};

const getRoutineData = async (data: RoutineDataInput): Promise<RoutineData> => {
  try {
    return await prisma.routineData.findFirstOrThrow({
      where: { analyticsId: data.analyticsId },
    });
  } catch (err) {
    throw new RequestError("Problem occured while finding routine data", 500);
  }
};

const updateLastResetDate = async (
  data: RoutineDataInput
): Promise<RoutineData> => {
  const now = convertToTimeZoneISO8601();
  return await prisma.routineData.update({
    where: { analyticsId: data.analyticsId },
    data: { lastRoutineReset: now },
  });
};

export const routineDataService = {
  initializeRoutineData,
  getRoutineData,
  updateLastResetDate,
};
