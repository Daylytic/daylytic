import { FastifyReply, FastifyRequest } from "fastify";
import { goalsService } from "./goals.service.js";
import { CreateGoalInput, DeleteGoalInput } from "./goals.schema.js";

export const createGoal = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        return await goalsService.createGoal(req.body as CreateGoalInput);
    } catch(err) {
        return rep.status(500).send({error: "Error occured while creating goal"})
    }
}

export const getGoals = async (req: FastifyRequest, rep: FastifyReply) => {
    try {
        return await goalsService.getGoals(req.user!);
    } catch(err) {
        return rep.status(500).send({error: "Error occured while fetching goals"});
    }
}

export const deleteGoal = async (req: FastifyRequest, rep: FastifyReply) => {
    const {id} = req.query as DeleteGoalInput;

    try {
        await goalsService.deleteGoal(req.user!.id, id);
        return rep.status(204).send();
    } catch (err: any) {
        return rep.status(400).send({error: err.message})
    }
}