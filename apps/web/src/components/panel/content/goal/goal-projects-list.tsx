import { Flex, Space } from "antd";
import { GoalProjectsCard } from "components/panel/content/goal/goal-projects-card";
import { styles } from ".";

export const GoalProjectsList = () => {
  return (
    <Space direction="horizontal" className={styles["projects-list"]}>
      <Flex className={styles.invert} gap="small">
        <GoalProjectsCard contentLines={5}/>
        <GoalProjectsCard contentLines={10}/>
        <GoalProjectsCard contentLines={40}/>
        <GoalProjectsCard contentLines={1}/>
        <GoalProjectsCard contentLines={3}/>
      </Flex>
    </Space>
  );
};
