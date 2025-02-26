import { Outlet } from "react-router";
import { Goals as GoalsContent } from "components/panel/content/goal";

export const LayoutGoal = () => (
  <>
    <GoalsContent />
    <Outlet />
  </>
);
