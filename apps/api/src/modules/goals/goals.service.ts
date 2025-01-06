import { prisma } from "../../utils/prisma.js"
import { UserCore } from "../auth/auth.schema.js"
import { CreateGoalInput } from "./goals.schema.js";

const getGoals = (user: UserCore) => {
    try {
        const goals = prisma.goal.findMany({where: {
            userId: user.id
        }})

        return goals;
    }catch(err) {
        console.error(err);
    }
}

const createGoal = (input: CreateGoalInput) => {
    try {
        // prisma.goal.create({data: input});
    }catch(err) {
        console.log(err);
    }
}

export const goalsService = {
    getGoals
}