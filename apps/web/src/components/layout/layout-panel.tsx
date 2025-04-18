import { Layout as AntLayout } from "antd";
import { styles } from ".";
import { useCookies } from "react-cookie";
import { TagProvider } from "~/providers/tag";
import { Outlet } from "react-router";
import { Menu } from "~/components/panel/menu";
import { GoalProvider } from "~/providers/goal";
import { PanelFetcherProvider } from "~/providers/panel-fetcher";
import { ProjectProvider } from "~/providers/project";
import { TaskProvider } from "~/providers/task";
import { SelectedTaskProvider } from "~/providers/selected-task";
import { AnalyticsProvider } from "~/providers/analytics";
import { TimelyticProvider } from "~/providers/timelytic";
import { AssistanceProvider } from "~/providers/assistance";
import { ReactNode } from "react";
import { LayoutProvider } from "~/providers/layout";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import { TourProvider } from "~/providers/tour";
import { GlobalTour } from "~/providers/tour/global-tour";
import { PrivateRoute } from "~/components/common/private-route";

interface PanelDataWrapperProps {
  children: ReactNode;
}

export const PanelDataWrapper = ({ children }: PanelDataWrapperProps) => {
  const [cookies] = useCookies(["token"]);
  NProgress.configure({
    minimum: 0.1,
    easing: "ease",
    speed: 500,
    trickle: true,
    trickleSpeed: 200,
    showSpinner: false,
  });

  return (
    <PanelFetcherProvider token={cookies.token}>
      <AnalyticsProvider>
        <AssistanceProvider>
          <TimelyticProvider>
            <GoalProvider>
              <ProjectProvider>
                <TaskProvider>
                  <SelectedTaskProvider>
                    <TagProvider>
                      <LayoutProvider>
                        <TourProvider>
                          <AntLayout id={styles.panel}>{children}</AntLayout>
                          <GlobalTour />
                        </TourProvider>
                      </LayoutProvider>
                    </TagProvider>
                  </SelectedTaskProvider>
                </TaskProvider>
              </ProjectProvider>
            </GoalProvider>
          </TimelyticProvider>
        </AssistanceProvider>
      </AnalyticsProvider>
    </PanelFetcherProvider>
  );
};

export const LayoutPanel = () => {
  // const {lg} =

  return (
    <PanelDataWrapper>
      <PrivateRoute>
        <Menu />
        <Outlet />
      </PrivateRoute>
    </PanelDataWrapper>
  );
};
