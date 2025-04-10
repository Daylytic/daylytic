import { useNavigate } from "react-router";
import { getDashboardRoute } from "~/utils/routes";
import { useAnalytics } from "~/providers/analytics";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useGoal } from "~/providers/goal";
import { useProject } from "~/providers/project";
import { useTask } from "~/providers/task";
import { useUser } from "~/providers/user";
import { useLayout } from "~/providers/layout";

interface ProductivityData {
  accountCreationDate: dayjs.Dayjs;
  routineStreak: number;
  recordRoutineStreak: number;
  tasksInRoutine: number;
  totalTasksFinished: number;
  totalProjectsFinished: number;
  totalGoalsReached: number;
  pomodoroSessions: number;
  pomodoroTimeSpent: number;
  pomodoroTasksDone: number;
}

const cubicScore = (ratio: number) => Math.pow(Math.min(ratio, 1), 3);

export const productivityLevels = [
  { name: "Getting Started", minPoints: 0 },
  { name: "Rising Routine", minPoints: 20 },
  { name: "The Productivity Builder", minPoints: 40 },
  { name: "The Efficiency Expert", minPoints: 60 },
  { name: "The Master of Productivity", minPoints: 80 },
];

const getProductivityLevel = (index: number): string => {
  // Since the levels are ordered by increasing minimum points,
  // iterate in reverse to get the highest level that qualifies.
  for (let i = productivityLevels.length - 1; i >= 0; i--) {
    if (index >= productivityLevels[i].minPoints) {
      return productivityLevels[i].name;
    }
  }
  return productivityLevels[0].name;
};

const calculateProductivityIndex = (data: ProductivityData): { index: number; level: string } => {
  // 1. Routine Consistency Factor (max 20)
  // Ratio of current routine streak to record routine streak.
  const routineRatio =
    data.recordRoutineStreak > 0 ? data.routineStreak / data.recordRoutineStreak : 0;
  const routineFactor = cubicScore(routineRatio) * 20;

  // 2. Task Completion Factor (max 20)
  // Expected tasks = tasksInRoutine * routineStreak.
  const expectedTasks =
    data.routineStreak > 0 ? data.tasksInRoutine * data.routineStreak : data.tasksInRoutine;
  const tasksRatio = expectedTasks > 0 ? data.totalTasksFinished / expectedTasks : 0;
  const tasksFactor = cubicScore(tasksRatio) * 20;

  // 3. Project Completion Factor (max 20)
  // Full points if 15 or more projects are finished.
  const projectsRatio = data.totalProjectsFinished / 15;
  const projectFactor = cubicScore(projectsRatio) * 20;

  // 4. Goals Achieved Factor (max 20)
  // Full points if 10 or more goals are reached.
  const goalsRatio = data.totalGoalsReached / 10;
  const goalsFactor = cubicScore(goalsRatio) * 20;

  // 5. Tasks in Routine Factor (max 10)
  // Rewards a well-set routine. Full score is achieved if there are at least 5 tasks in the routine.
  const tasksInRoutineRatio = Math.min(data.tasksInRoutine / 5, 1);
  const tasksInRoutineFactor = cubicScore(tasksInRoutineRatio) * 10;

  // 6. Pomodoro Time Performance Factor (max 6)
  // Calculate average timelytic time per day relative to a target of 120 minutes.
  const accountAgeDays = Math.max(dayjs().diff(data.accountCreationDate, "day"), 1);
  const avgPomodoroMinutesPerDay = data.pomodoroTimeSpent / accountAgeDays;
  const targetMinutesPerDay = 120;
  const pomodoroTimeRatio = avgPomodoroMinutesPerDay / targetMinutesPerDay;
  const pomodoroTimeFactor = cubicScore(pomodoroTimeRatio) * 20 * 0.3;

  // 7. Pomodoro Task Efficiency Factor (max 6)
  // Full points if on average 1.2 tasks are done per pomodoro session.
  const targetTasksPerSession = 1.2;
  const pomodoroTaskRatio =
    data.pomodoroSessions > 0
      ? data.pomodoroTasksDone / (data.pomodoroSessions * targetTasksPerSession)
      : 0;
  const pomodoroTaskFactor = cubicScore(pomodoroTaskRatio) * 20 * 0.3;

  // Sum up all factors. Maximum raw score = 20 + 20 + 20 + 20 + 10 + 6 + 6 = 102.
  const rawScore =
    routineFactor +
    tasksFactor +
    projectFactor +
    goalsFactor +
    tasksInRoutineFactor +
    pomodoroTimeFactor +
    pomodoroTaskFactor;
  // Rescale to a 0-100 range.

  const index = Math.round((rawScore / 102) * 100);
  const level = getProductivityLevel(index);

  return { index, level };
};

export const useUserStatistics = () => {
  const { setShowAction } = useLayout();
  const navigate = useNavigate();
  const { analytics } = useAnalytics();

  const { tasks } = useTask();
  const { projects } = useProject();
  const { goals } = useGoal();
  const { profile } = useUser();

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

  const openDailyAssistant = () => {
    setShowAction(true);
    navigate(getDashboardRoute(true));
  };

  const productivityData: ProductivityData = {
    accountCreationDate: dayjs(profile?.createdAt),
    routineStreak: analytics?.routineStreak ?? 0,
    recordRoutineStreak: analytics?.recordRoutineStreak ?? 0,
    tasksInRoutine: tasks.filter((task) => task.taskType === "ROUTINE").length,
    totalTasksFinished: completedTasks.length,
    totalProjectsFinished: finishedProjects.length,
    totalGoalsReached: finishedGoals.length,
    pomodoroSessions: analytics?.timelyticSessions ?? 0,
    pomodoroTimeSpent: (analytics?.timelyticTimeSpent ?? 1) / 60,
    pomodoroTasksDone: analytics?.timelyticTasksFinished ?? 0,
  };

  const result = calculateProductivityIndex(productivityData);

  return { openDailyAssistant, result, analytics };
};
