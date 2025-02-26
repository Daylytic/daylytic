import { Content } from "antd/es/layout/layout";
import { GoalHeader, styles } from ".";
import { GoalProjectsList } from "components/panel/content/goal/goal-projects-list";

export const Goals = () => {
  return (
    <Content id={styles.content}>
      <GoalHeader />
      <GoalProjectsList />
    </Content>
  );
};
