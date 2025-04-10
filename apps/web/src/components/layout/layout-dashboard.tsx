import { Dashboard as DashboardContent } from "~/components/panel/content/dashboard";
import { Outlet } from "react-router";

export const LayoutDashboard = () => (
  <>
    <DashboardContent />
    <Outlet />
  </>
);
