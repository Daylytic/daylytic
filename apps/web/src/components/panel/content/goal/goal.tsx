import { Content } from "antd/es/layout/layout";
import { GoalHeader, styles } from ".";
import { GoalBoard } from "components/panel/content/goal/goal-board";
import { redirect, useParams } from "react-router";
import { useGoal } from "providers/goal";
import { Routes } from "utils/routes";

export const Goals = () => {
  const { goalId } = useParams();
  const { goals, selectedGoal } = useGoal();

  if(!goalId) {
    redirect(Routes.PANEL_DASHBOARD);
  }

  if (!selectedGoal.current) {
    selectedGoal.current = goals.find((goal) => goal.id === goalId);
  }

  return (
    <Content id={styles.content}>
      <GoalHeader />
      <GoalBoard />
    </Content>
  );
};
