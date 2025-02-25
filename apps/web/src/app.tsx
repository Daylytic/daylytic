import { ConfigProvider } from "antd";
import { Routes, Route, BrowserRouter } from "react-router";
import { ScrollToHash } from "components/common/scroll-to-hash";
import { Home } from "pages/home";
import { Panel } from "pages/panel";
import { Routine as RoutineAction } from "components/panel/action/routine";
import { LayoutRoutine } from "components/layout/layout-routine";
import { LayoutTag } from "components/layout/layout-tag";

export const App = () => (
  <ConfigProvider
    theme={{
      hashed: false,
      cssVar: true,
      token: {
        // Seed Token
        colorPrimary: "#6247aa",
        borderRadius: 5,
        fontFamily: "Poppins",
        colorBgLayout: "#f5f5f5",
        colorWhite: "#fafafa",
      },
      components: {
        Layout: {
          headerBg: "#f5f5f5",
          headerColor: "#f5f5f5",
          headerPadding: 0,
          colorBgContainer: "#fafafa",
          bodyBg: "#fafafa",
          siderBg: "#f5f5f5",
        },
        Menu: {
          popupBg: "#f5f5f5",
          itemBg: "#f5f5f5",
          activeBarBorderWidth: 0,
          itemMarginInline: 0,
        },
        List: {
          metaMarginBottom: 0,
          itemPadding: "4px 0",
        },
      },
    }}
  >
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/panel/*"
          element={
            // <PrivateRoute>
            //   <Panel />
            // </PrivateRoute>
            <Panel />
          }
        >
          <Route path="routine" element={<LayoutRoutine />}>
            <Route path=":taskId" element={<RoutineAction />} />
          </Route>
          <Route path="tag/:tagId" element={<LayoutTag />}>
            <Route path=":taskId" element={<RoutineAction />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);
