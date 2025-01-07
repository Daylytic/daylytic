import { FastifyReply, FastifyRequest } from "fastify"
import { ProjectsQuery } from "./projects.schema.js"

const getProjects = async() => {

}

const createProject = async() => {

}

const verifyGoalId = async(req: FastifyRequest, rep: FastifyReply) => {
    const { goalId } = req.query as ProjectsQuery;

    
}

export const projectsController = {
    getProjects,
    createProject,
    verifyGoalId
} 