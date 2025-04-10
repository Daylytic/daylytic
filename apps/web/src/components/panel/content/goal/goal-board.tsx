import { styles, GoalAddProjectCard, GoalProjectsCard, useGoalBoard } from ".";
import { Flex } from "antd";
import { GoalProjectCardSkeleton } from "./skeleton";
import { useProject } from "~/providers/project";

export const GoalBoard = () => {
  const { selectedGoal, projects } = useGoalBoard();
  const { fetched } = useProject();

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
        <GoalProjectCardSkeleton />
      )}
    </Flex>
  );
};
