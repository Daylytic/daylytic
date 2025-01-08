import { prisma } from "../../utils/prisma.js"
import { UserCore } from "../auth/auth.schema.js"
import { CreateGoalInput, GoalCore } from "./goals.schema.js";

const getGoal = async (goalId: string): Promise<GoalCore> => {
    try {
        return await prisma.goal.findFirstOrThrow({where: {
            id: goalId
        }});
    }catch(err) {
        throw Error("Could not find goal with given id");
    }
}

const getGoals = async (user: UserCore): Promise<GoalCore[]> => {
    const goals = await prisma.goal.findMany({
        where: {
            userId: user.id
        }
    })

    return goals!;
}

const createGoal = async (input: CreateGoalInput) => {
    try {
        return await prisma.goal.create({ data: input });
    } catch (err) {
        throw err;
    }
}

const deleteGoal = async (userId: string, goalId: string) => {
    try {
        await prisma.goal.delete({
            where: {
                id: goalId,
                userId: userId
            }
        });
    } catch (err) {
        throw Error("Could not find goal with given id.")
    }
}

export const goalsService = {
    getGoals,
    createGoal,
    deleteGoal,
    getGoal,
}