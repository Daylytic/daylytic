import { Layout as AntLayout } from "antd";
import { styles } from ".";
import { useCookies } from "react-cookie";
import { DailyTasksProvider } from "providers/daily-tasks";
import { TagProvider } from "providers/tag";
import { Outlet } from "react-router";
import { Menu } from "components/panel/menu";
import { GoalProvider } from "providers/goal";

export const LayoutPanel = () => {
  const [cookies] = useCookies(["token"]);
  return (
    <GoalProvider token={cookies.token}>
      <DailyTasksProvider token={cookies.token}>
        <TagProvider token={cookies.token}>
          <AntLayout id={styles.panel}>
            <Menu />
            <Outlet />
          </AntLayout>
        </TagProvider>
      </DailyTasksProvider>
    </GoalProvider>
  );
};
