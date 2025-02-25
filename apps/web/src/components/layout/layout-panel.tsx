import { Layout as AntLayout, Menu } from "antd";
import styles from "./layout.module.css";
import { useCookies } from "react-cookie";
import { DailyTasksProvider } from "providers/daily-tasks";
import { TagProvider } from "providers/tag";
import { Outlet } from "react-router";

export const LayoutPanel = () => {
  const [cookies] = useCookies(["token"]);
  return (
    <DailyTasksProvider token={cookies.token}>
      <TagProvider token={cookies.token}>
        <AntLayout id={styles.panel}>
          <Menu />
          <Outlet />
        </AntLayout>
      </TagProvider>
    </DailyTasksProvider>
  );
};
