import { prisma } from "../../utils/prisma.js"
import { CoreProject, CreateProjectInput } from "./projects.schema.js"

const getProject = async (id: string): Promise<CoreProject> => {
    try {
        return await prisma.project.findFirstOrThrow({
            where: {
                id: id
            }
        })
    } catch (_) {
        throw Error("Could not find project with given id")
    }
}

const getProjects = async (goalId: string): Promise<CoreProject[]> => {
    return await prisma.project.findMany({
        where: {
            goalId: goalId
        }
    });
}

const createProject = async (input: CreateProjectInput): Promise<CoreProject> => {
    try {
        return await prisma.project.create({data: input});
    } catch (err) {
        throw err;
    }
}

export const projectsService = {
    getProject,
    getProjects,
}