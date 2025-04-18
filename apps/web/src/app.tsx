import { ConfigProvider, App as AntApp } from "antd";
import { Routes, Route, BrowserRouter, Navigate } from "react-router"; // Ensure using react-router-dom
import { ScrollToHash } from "~/components/common/scroll-to-hash";
import { Task as TaskActionWrapper } from "~/components/panel/action/task";
import { TaskAction } from "~/components/panel/action/task";
import { Calendar as CalendarAction } from "~/components/panel/action/calendar";
import { Dashboard as DashboardAction } from "~/components/panel/action/dashboard";
import {
  LayoutRoutine,
  LayoutTag,
  LayoutPanel,
  LayoutHome,
  LayoutCalendar,
  LayoutTimelytic,
  LayoutDashboard,
  LayoutGoal,
  LayoutSetup,
} from "~/components/layout";
import { config } from "~/config";
import { NotificationProvider } from "~/providers/notification";
import { useUser } from "~/providers/user";
import { useEffect } from "react";
import { registerServiceWorker } from "~/utils/register-service-worker";
import { PrivateRoute } from "~/components/common/private-route";

export const App = () => {
  const { isDarkMode } = useUser();

  useEffect(() => {
    registerServiceWorker();
  });

  return (
    <ConfigProvider theme={config({ darkMode: isDarkMode() })}>
      <AntApp>
        <NotificationProvider>
          <BrowserRouter>
            <ScrollToHash />
            <Routes>
              {/* Public Routes */}
              <Route index element={<LayoutHome />} />
              <Route path="/setup" element={<LayoutSetup />} />

              {/* Protected Routes */}
              <Route
                path="/panel/*"
                element={
                  <PrivateRoute>
                    <LayoutPanel />
                  </PrivateRoute>
                }
              >
                <Route path="dashboard" element={<LayoutDashboard />}>
                  <Route path="daily-assistant/:assistanceId?" element={<DashboardAction />} />
                </Route>
                <Route path="goal/:goalId" element={<LayoutGoal />}>
                  <Route path=":taskId" element={<TaskActionWrapper />} />
                </Route>
                <Route path="routine" element={<LayoutRoutine />}>
                  <Route path=":taskId" element={<TaskActionWrapper />} />
                </Route>
                <Route path="tag/:tagId" element={<LayoutTag />}>
                  <Route path=":taskId" element={<TaskActionWrapper />} />
                </Route>
                <Route path="timelytic" element={<LayoutTimelytic />} />
                <Route path="calendar" element={<LayoutCalendar />}>
                  <Route path=":date" element={<CalendarAction />}>
                    <Route path=":goalId?/:taskId" element={<TaskAction />} />
                  </Route>
                </Route>
                {/* If LayoutPanel itself doesn't handle non-matching nested routes,
                    you might want a catch-all or index route within /panel/* */}
                 <Route index element={<Navigate to="dashboard" replace />} />
              </Route>

              {/* 404 Not Found Route */}
              <Route path="*" element={<LayoutHome />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AntApp>
    </ConfigProvider>
  );
};