import { prisma } from "utils/prisma.js"
import { StatsSchema } from "./stats.schema.js";
import { RequestError } from "utils/error.js";

const fetchStats = async (): Promise<StatsSchema> => {
    try {
        const completedTasks = await prisma.task.count({
            where: {
                isCompleted: true,
            },
        });

        // Count of completed projects
        const completedProjects = await prisma.project.count({
            where: {
                tasks: {
                    every: {
                        isCompleted: true,
                    },
                },
            },
        });

        // Count of completed goals
        const reachedGoals = await prisma.goal.count({
            where: {
                projects: {
                    every: {
                        tasks: {
                            every: {
                                isCompleted: true,
                            },
                        },
                    },
                },
            },
        });

        return { reachedGoals, completedProjects, completedTasks };
    } catch (err) {
        throw new RequestError("Problem occured while fetching timelytic profile", 500, err);
    }
};

export const statsService = {
    fetchStats,
}