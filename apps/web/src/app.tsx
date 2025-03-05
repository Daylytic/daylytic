import { ConfigProvider } from "antd";
import { Routes, Route, BrowserRouter } from "react-router";
import { ScrollToHash } from "components/common/scroll-to-hash";
import { Routine as RoutineAction } from "components/panel/action/routine";
import { Tag as TagAction } from "components/panel/action/tag";
import { Goal as GoalAction } from "components/panel/action/goal";
import { LayoutRoutine, LayoutTag, LayoutPanel, LayoutHome } from "components/layout";
import { config } from "config";
import { LayoutGoal } from "components/layout/layout-goal";

export const App = () => (
  <ConfigProvider theme={config}>
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route index element={<LayoutHome />} />
        <Route path="/panel/*" element={<LayoutPanel />}>
          <Route path="goal/:goalId" element={<LayoutGoal />}>
            <Route path=":taskId" element={<GoalAction />} />
          </Route>
          <Route path="routine" element={<LayoutRoutine />}>
            <Route path=":taskId" element={<RoutineAction />} />
          </Route>
          <Route path="tag/:tagId" element={<LayoutTag />}>
            <Route path=":taskId" element={<TagAction />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);
