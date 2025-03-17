import { styles } from ".";
import { GoalProjectsCard } from "./goal-projects-card";
import { GoalAddProjectCard } from "components/panel/content/goal/goal-add-project-card";
import { Flex } from "antd";
import { useGoalBoard } from "components/panel/content/goal/use-board";
import { GoalProjectsCardSkeleton } from "components/panel/content/goal/skeleton/goal-projects-card-skeleton";

export const GoalBoard = () => {
  const { selectedGoal, projects, fetched } = useGoalBoard();

  return (
    <Flex className={styles["projects-list-wrapper"]}>
      {fetched ? (
        <ul className={styles["projects-list"]}>
          {projects
            .filter((p) => p.goalId === selectedGoal.current?.id)
            .sort((a, b) => a.position - b.position)
            .map((project) => (
              <GoalProjectsCard key={project.id} project={project} />
            ))}
          <GoalAddProjectCard />
        </ul>
      ) : (
        <GoalProjectsCardSkeleton />
      )}
    </Flex>
  );
};
