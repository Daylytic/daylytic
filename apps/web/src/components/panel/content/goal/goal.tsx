import { GoalHeader, GoalBoard } from ".";
import { redirect, useParams } from "react-router";
import { useGoal } from "~/providers/goal";
import { Routes } from "~/utils/routes";
import { Content } from "../";

export const Goals = () => {
  const { goalId } = useParams();
  const { goals, selectedGoal } = useGoal();

  if (!goalId) {
    redirect(Routes.PANEL_DASHBOARD);
  }

  if (!selectedGoal.current) {
    selectedGoal.current = goals.find((goal) => goal.id === goalId);
  }

  return (
    <Content>
      <GoalHeader />
      <GoalBoard />
    </Content>
  );
};
