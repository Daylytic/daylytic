import { ConfigProvider } from "antd";
import { Routes, Route, BrowserRouter } from "react-router";
import { ScrollToHash } from "components/common/scroll-to-hash";
import { Home } from "pages/home";
import { Routine as RoutineAction } from "components/panel/action/routine";
import { Tag as TagAction } from "components/panel/action/tag";
import { LayoutRoutine, LayoutTag, LayoutPanel } from "components/layout";
import { config } from "config";

export const App = () => (
  <ConfigProvider theme={config}>
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route index element={<LayoutHome />} />
        <Route path="/panel/*" element={<LayoutPanel />}>
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
