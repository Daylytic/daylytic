import { ConfigProvider } from "antd";
import { Panel } from "pages/panel";
import { Home } from "pages/home/home";
import { Routes, Route, BrowserRouter } from "react-router";
import { ScrollToHash } from "components/common/scroll-to-hash";
import { PrivateRoute } from "pages/private-route";

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
        colorBgContainer: "white",
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
          itemPadding: "4px",
        }
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
        />
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);
