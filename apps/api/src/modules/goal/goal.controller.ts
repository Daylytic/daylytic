import { FastifyReply, FastifyRequest } from "fastify"
import { handleControllerError } from "utils/error.js"

const createGoal = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        
    }catch(err) {
        handleControllerError(err, rep);
    }
}

const deleteGoal = async () => {

}

const updateGoal = async () => {

}

export const goalController = {
    createGoal,
    deleteGoal,
    updateGoal,
}