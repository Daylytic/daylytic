import { LayoutPanel } from "components/layout/layout-panel";
import { Menu } from "components/panel/menu";
import { DailyTasksProvider } from "providers/daily-tasks";
import { TagProvider } from "providers/tag";
import { useCookies } from "react-cookie";
import { Outlet } from "react-router";

export const Panel = () => {
  const [cookies] = useCookies(["token"]);
  return (
    <DailyTasksProvider token={cookies.token}>
      <TagProvider token={cookies.token}>
        <LayoutPanel>
          <Menu />
          <Outlet />
        </LayoutPanel>
      </TagProvider>
    </DailyTasksProvider>
  );
};
