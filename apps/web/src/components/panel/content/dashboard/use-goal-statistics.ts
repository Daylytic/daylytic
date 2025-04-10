import { useMemo } from "react";
import { useGoal } from "~/providers/goal";
import { useProject } from "~/providers/project";
import { useTask } from "~/providers/task";

export const useGoalStatistics = () => {
    const { tasks } = useTask();
    const { projects } = useProject();
    const { goals } = useGoal();

    const tasksByProject = useMemo(() => {
        return tasks.reduce(
            (acc, task) => {
                if (task.projectId) {
                    if (!acc[task.projectId]) acc[task.projectId] = [];
                    acc[task.projectId].push(task);
                }
                return acc;
            },
            {} as Record<string, typeof tasks>,
        );
    }, [tasks]);

    const finishedProjects = useMemo(() => {
        return projects.filter((project) => {
            const projectTasks = tasksByProject[project.id] || [];
            return projectTasks.length === 0 || projectTasks.every((task) => task.isCompleted);
        });
    }, [projects, tasksByProject]);

    const projectsByGoal = useMemo(() => {
        return projects.reduce(
            (acc, project) => {
                if (project.goalId) {
                    if (!acc[project.goalId]) acc[project.goalId] = [];
                    acc[project.goalId].push(project);
                }
                return acc;
            },
            {} as Record<string, typeof projects>,
        );
    }, [projects]);

    const finishedGoals = useMemo(() => {
        return goals.filter((goal) => {
            const goalProjects = projectsByGoal[goal.id] || [];
            return (
                goalProjects.length > 0 &&
                goalProjects.every((project) => {
                    const projectTasks = tasksByProject[project.id] || [];
                    return projectTasks.length === 0 || projectTasks.every((task) => task.isCompleted);
                })
            );
        });
    }, [goals, projectsByGoal, tasksByProject]);

    const completedTasks = useMemo(() => {
        return tasks.filter((task) => task.isCompleted && task.taskType === "PROJECT");
    }, [tasks]);
    
    return { completedTasks, finishedGoals, finishedProjects };
}