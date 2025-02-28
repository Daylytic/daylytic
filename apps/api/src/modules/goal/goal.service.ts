import { prisma } from "utils/prisma.js";
import { CreateGoalSchema, DeleteGoalSchema, FetchGoalsSchema, FetchGoalWithIdSchema, GoalSchema, UpdateGoalSchema } from "./goal.schema.js";
import { RequestError } from "utils/error.js";

const createGoal = async (data: CreateGoalSchema) => {
  try {
    await prisma.goal.create({
      data: data,
    });
  } catch (err) {
    throw new RequestError("Problem occured while creating goal", 500, err);
  }
};

const fetchGoalWithId = async(data: FetchGoalWithIdSchema) => {
  return await prisma.goal.findFirst({
    where: data,
  });
}

const fetchGoals = async (data: FetchGoalsSchema): Promise<GoalSchema[]> => {
  return await prisma.goal.findMany({
    where: data,
  });
};

const deleteGoal = async (data: DeleteGoalSchema) => {
    try {
        return await prisma.goal.delete({
            where: data
        });
    }catch (err) {
        throw new RequestError("The task with given ID does not exist", 404, err);
    }
}

const updateGoal = async (data: UpdateGoalSchema) => {
    try {
        return await prisma.goal.update({
            where: {
                id: data.id,
                userId: data.userId,
            },
            data: data
        });
    } catch(err) {
        throw new RequestError("Could not update task", 500, err);
    }
}

export const goalService = {
  createGoal,
  fetchGoals,
  fetchGoalWithId,
  deleteGoal,
  updateGoal,
};
