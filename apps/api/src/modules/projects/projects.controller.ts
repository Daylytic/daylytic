import { FastifyReply, FastifyRequest } from "fastify"
import { ProjectsBaseQuery } from "./projects.schema.js"
import { projectsService } from "./projects.service.js"
import { goalsService } from "../goals/goals.service.js"

const getProjects = async (req: FastifyRequest, rep: FastifyReply) => {
    const { goalId } = req.query as ProjectsBaseQuery;

    return projectsService.getProjects(goalId);
}

const createProject = async () => {

}

const verifyGoalId = async (req: FastifyRequest, rep: FastifyReply) => {
    const { goalId } = req.query as ProjectsBaseQuery;
    const goal = await goalsService.getGoal(goalId);

    if (goal.userId !== req.user!.id) {
        return rep.status(401).send({ error: "Unauthorized" });
    }
}

export const projectsController = {
    getProjects,
    createProject,
    verifyGoalId
} 