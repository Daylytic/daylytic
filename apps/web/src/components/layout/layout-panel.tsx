import { Layout as AntLayout } from "antd";
import { styles } from ".";
import { useCookies } from "react-cookie";
import { DailyTasksProvider } from "providers/daily-tasks";
import { TagProvider } from "providers/tag";
import { Outlet } from "react-router";
import { Menu } from "components/panel/menu";
import { GoalProvider } from "providers/goal";
import { PanelFetcherProvider } from "providers/panel-fetcher";
import { ProjectProvider } from "providers/project";
import { TaskProvider } from "providers/task";
import { SelectedTaskProvider } from "providers/selected-task";

export const LayoutPanel = () => {
  const [cookies] = useCookies(["token"]);
  return (
    <PanelFetcherProvider token={cookies.token}>
      <GoalProvider token={cookies.token}>
        <ProjectProvider>
          <TaskProvider>
            <SelectedTaskProvider>
              <DailyTasksProvider token={cookies.token}>
                <TagProvider token={cookies.token}>
                  <AntLayout id={styles.panel}>
                    <Menu />
                    <Outlet />
                  </AntLayout>
                </TagProvider>
              </DailyTasksProvider>
            </SelectedTaskProvider>
          </TaskProvider>
        </ProjectProvider>
      </GoalProvider>
    </PanelFetcherProvider>
  );
};
