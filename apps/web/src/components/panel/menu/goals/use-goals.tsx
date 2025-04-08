import { useNavigate } from "react-router";
import { useLayout } from "~/providers/layout";
import { useGoal } from "~/providers/goal";
import { useTask } from "~/providers/task";
import { useProject } from "~/providers/project";
import { usePanel } from "~/hooks/use-panel";
import dayjs from "dayjs";
import { getTimeAgo } from "~/utils/date";
import { GoalsCard } from ".";

export const useGoals = () => {
  const navigate = useNavigate();
  const { setShowMenu } = useLayout();
  const { goals, selectedGoal, fetched } = useGoal();
  const { tasks } = useTask();
  const { projects } = useProject();
  const { getContent } = usePanel();

  const handleRenderItem = (item) => {
    const projectsWithinGoal = projects.filter((project) => project.goalId === item.id);
    const tasksWithinProjects = tasks.filter((task) =>
      projectsWithinGoal.some((project) => project.id === task.projectId),
    );

    const completedTasks = tasksWithinProjects.filter((task) => task.isCompleted).length;
    const latestUpdatedAt =
      tasksWithinProjects.length > 0
        ? tasksWithinProjects.sort((a, b) => dayjs(b.updatedAt).diff(dayjs(a.updatedAt)))[0]
            .updatedAt
        : null;

    const totalTasks = tasksWithinProjects.length;

    // Calculate percentage (avoid division by zero)
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
      <GoalsCard
        selected={getContent() === item.id}
        id={item.id}
        percentage={completionPercentage}
        lastUpdated={getTimeAgo(latestUpdatedAt)}
        title={item.title}
        onClick={(key) => {
          selectedGoal.current = item;
          navigate(`/panel/goal/${key}`);
          setShowMenu(false);
        }}
      />
    );
  };


  const getGoalStats = (goalId: string) => {
    const projectsWithinGoal = projects.filter((project) => project.goalId === goalId);
    const tasksWithinProjects = tasks.filter((task) =>
      projectsWithinGoal.some((project) => project.id === task.projectId)
    );

    const completedTasks = tasksWithinProjects.filter((task) => task.isCompleted).length;
    const latestUpdatedAt =
      tasksWithinProjects.length > 0
        ? tasksWithinProjects.sort((a, b) => dayjs(b.updatedAt).diff(dayjs(a.updatedAt)))[0]
            .updatedAt
        : null;

    const totalTasks = tasksWithinProjects.length;
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return {
      percentage: completionPercentage,
      lastUpdated: getTimeAgo(latestUpdatedAt),
    };
  };

  const handleGoalClick = (id: string) => {
    selectedGoal.current = goals.find((goal) => goal.id === id);
    navigate(`/panel/goal/${id}`);
    setShowMenu(false);
  };

  return {
    goals,
    fetched,
    getGoalStats,
    handleGoalClick,
    getContent,
    handleRenderItem,
  };
};
