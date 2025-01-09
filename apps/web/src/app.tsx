import { ConfigProvider } from "antd";
import { Goals } from "pages/goals";
import { Home } from "pages/home/home";
import { Showcase } from "pages/showcase";
import { Routes, Route, BrowserRouter } from "react-router";
import { Layout } from "components/layout";
import { ScrollToHash } from "components/common/scroll-to-hash";

export const App = () => (
  <ConfigProvider
    theme={{
      hashed: false,
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
          // colorBgContainer: "#fafafa",
          bodyBg: "#fafafa",
          siderBg: "#f5f5f5",
        },
        Menu: {
          popupBg: "#f5f5f5",
          itemBg: "#f5f5f5",
        },
      },
    }}
  >
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/panel" element={<Goals />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/todo" element={<Showcase />} />
      </Routes>
    </BrowserRouter>
  </ConfigProvider>
);
