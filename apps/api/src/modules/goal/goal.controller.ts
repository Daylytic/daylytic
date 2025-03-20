import { FastifyReply, FastifyRequest } from "fastify";
import { handleControllerError, RequestError } from "utils/error.js";
import { goalService } from "./goal.service.js";
import {
  CreateGoalInputSchema,
  DeleteGoalInputSchema,
  GoalSchema,
} from "./goal.schema.js";

const createGoal = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const { title, description } = req.body as CreateGoalInputSchema;
    return await goalService.createGoal({ userId, title, description });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const fetchGoals = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    return await goalService.fetchGoals({ userId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const fetchAll = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    return await goalService.fetchAll({ userId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};


const deleteGoal = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const { goalId } = req.params as DeleteGoalInputSchema;
    await goalService.deleteGoal({ userId, id: goalId });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const updateGoal = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const goal = req.body as GoalSchema;

    await goalService.fetchGoalWithId({ userId, id: goal.id })

    return await goalService.updateGoal(goal);
  } catch (err) {
    handleControllerError(err, rep);
  }
};

export const goalController = {
  createGoal,
  fetchGoals,
  fetchAll,
  deleteGoal,
  updateGoal,
};
