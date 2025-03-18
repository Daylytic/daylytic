import { Flex, List, Typography } from "antd";
import clsx from "clsx";
import { styles } from ".";
import { GoalCreatorCard } from "components/panel/menu/goals/goal-creator-card";
import { GoalsCard } from "components/panel/menu/goals/goals-card";
import { usePanel } from "hooks/use-panel";
import { useGoal } from "providers/goal";
import { useNavigate } from "react-router";
import { useTask } from "providers/task";
import { useProject } from "providers/project";
import { GoalsCardsSkeleton } from "components/panel/menu/goals/skeleton/goals-cards-skeleton";
import { getTimeAgo } from "utils/date";

export const Goals = () => {
  const navigate = useNavigate();
  const { goals, selectedGoal, fetched } = useGoal();
  const { tasks } = useTask();
  const { projects } = useProject();
  const { getContent } = usePanel();

  return (
    <Flex vertical className={styles["menu-wrapper"]}>
      <Typography.Title level={4}>Goals</Typography.Title>
      {!fetched ? (
        <GoalsCardsSkeleton />
      ) : (
        <List
          itemLayout="vertical"
          header={<GoalCreatorCard />}
          dataSource={goals}
          id={styles.wrapper}
          className={clsx("css-var-r1", "ant-menu-css-var")}
          renderItem={(item, _) => {
            const projectsWithinGoal = projects.filter((project) => project.goalId === item.id);
            const tasksWithinProjects = tasks.filter((task) =>
              projectsWithinGoal.some((project) => project.id === task.projectId),
            );

            // Count completed tasks
            const completedTasks = tasksWithinProjects.filter((task) => task.isCompleted).length;
            const latestUpdatedAt = tasksWithinProjects.length > 0
            ? new Date(Math.max(...tasksWithinProjects.map((task) => new Date(task.updatedAt).getTime())))
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
                }}
              />
            );
          }}
        />
      )}
    </Flex>
  );
};
