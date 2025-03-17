import { Flex, Space } from "antd";
import { styles } from ".";
import { useGoal } from "providers/goal";
import { GoalAddProjectCard } from "./goal-add-project-card";
import { GoalProjectsCard } from "./goal-projects-card";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect } from "react";

export const GoalBoard = () => {
  const { selectedGoal, projects } = useGoal();

  useEffect(() => {
    return monitorForElements({
        onDrop({ source, location }) {
            const destination = location.current.dropTargets[0];
            if (!destination) {
                // if dropped outside of any drop targets
                return;
            }
            const destinationLocation = destination.data.location;
            const sourceLocation = source.data.location;
            const pieceType = source.data.taskId;
            console.log([destinationLocation, sourceLocation, pieceType]);  
        },
    });
}, []);

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
