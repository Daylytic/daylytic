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

const deleteGoal = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const { id } = req.body as DeleteGoalInputSchema;
    return await goalService.deleteGoal({ userId, id });
  } catch (err) {
    handleControllerError(err, rep);
  }
};

const updateGoal = async (req: FastifyRequest, rep: FastifyReply) => {
  try {
    const userId = req.user!.id;
    const task = req.body as GoalSchema;

    if (task.userId !== userId) {
      throw new RequestError("You do not have access to this goal.", 403, null);
    }

    return await goalService.updateGoal(task);
  } catch (err) {
    handleControllerError(err, rep);
  }
};

export const goalController = {
  createGoal,
  fetchGoals,
  deleteGoal,
  updateGoal,
};
