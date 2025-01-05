import { ConfigProvider } from "antd";
import { Goals } from "pages/goals";
import { Home } from "pages/home/home";
import { Showcase } from "pages/showcase";
import { Routes, Route, BrowserRouter } from "react-router";

export const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#6247aa",
          borderRadius: 2,
          fontFamily: "Poppins",
        },
        components: {
          Layout: {
            headerBg: "#fbfbfb",
            headerHeight: "128px",
          }
        }
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/showcase" element={<Showcase />} />
          <Route path="/todo" element={<Showcase />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};
