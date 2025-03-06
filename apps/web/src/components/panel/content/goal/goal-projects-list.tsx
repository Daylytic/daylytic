import { Flex, Space } from "antd";
import { GoalProjectsCard } from "components/panel/content/goal/goal-projects-card";
import { styles } from ".";
import { useGoal } from "providers/goal";
import { GoalAddProjectCard } from "components/panel/content/goal/goal-add-project-card";

export const GoalProjectsList = () => {
  const { selectedGoal, projects } = useGoal();

  return (
    <Space direction="horizontal" className={styles["projects-list"]}>
      <Flex className={styles.invert} gap="small">
        {projects
          .filter((p) => p.goalId === selectedGoal.current!.id)
          .map((project) => (
            <GoalProjectsCard project={project} />
          ))}
        <GoalAddProjectCard />
      </Flex>
    </Space>
  );
};
