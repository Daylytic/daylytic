import { ConfigProvider } from "antd";
import { Goals } from "pages/goals";
import { Home } from "pages/home/home";
import { Showcase } from "pages/showcase";
import { Routes, Route, BrowserRouter } from "react-router";
import { Layout } from "components/layout";

export const App = () => (
  <ConfigProvider
    theme={{
      hashed: false,
      token: {
        // Seed Token
        colorPrimary: "#6247aa",
        borderRadius: 2,
        colorWhite: "#f5f5f5",
        fontFamily: "Poppins",
      },
      components: {
        Layout: {
          headerBg: "#f5f5f5",
          headerColor: "#f5f5f5",
          headerPadding: 0,
        },
        Menu: {
          popupBg: "#f5f5f5",
          itemBg: "#f5f5f5",
        },
      },
    }}
  >
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/todo" element={<Showcase />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  </ConfigProvider>
);
