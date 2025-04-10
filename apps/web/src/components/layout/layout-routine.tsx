import { Outlet } from "react-router";
import { Routine as RoutineContent } from "~/components/panel/content/routine";

export const LayoutRoutine = () => (
  <>
    <RoutineContent />
    <Outlet />
  </>
);
