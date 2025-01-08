import {
  Menu,
  Avatar,
  Layout as AntLayout,
  Anchor,
  ConfigProvider,
} from "antd";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { Goals } from "pages/goals";
import { Home } from "pages/home";
import { Showcase } from "pages/showcase";
import { useUser } from "providers/user-provider";
import { ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Logo from "assets/svgs/logo.svg";

const items = [
  {
    key: 1,
    label: <img height="100%" src={Logo} style={{ padding: "5px" }}></img>,
  },
  { key: 2, label: "About" },
  { key: 3, label: "FAQ" },
  { key: 4, label: "Contact" },
];

const anchoritems = [
  {
    key: "hero",
    title: (
      <img
        src={Logo}
        height="100%"
        style={{
          padding: "5px",
          width: "auto",
          margin: "auto",
        }}
      ></img>
    ),
    href: "#hero",
  },
  { key: "about", title: "About", href: "#about" },
  { key: "faq", title: "FAQ", href: "#faq" },
  { key: "contact", title: "Contact", href: "#contact" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  //   const { componentSize} = ConfigProvider.use();

  const user = useUser();
  return (
    <AntLayout>
      <Header
        style={{
          position: "fixed",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          border: "1px solid rgba(5, 5, 5, 0.06)",
        }}
      >
        {/* <div className="demo-logo">Heee</div> */}

        {/* <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items}
          style={{ flex: 1, minWidth: 0, justifyContent: "center" }}
        /> */}
        <Anchor
          direction="horizontal"
          items={anchoritems}
          style={{
            width: "100%",
            minWidth: 0,
            justifyContent: "center",
            maxHeight: "100%",
          }}
        />
        <Avatar
          src={
            <img
              src={user.profile?.picture}
              alt="avatar"
              style={{
                borderRadius: "",
                color: "black",
                height: "100%",
                width: "100%",
              }}
            />
          }
          style={{
            color: "black",
            position: "fixed",
            right: 0,
            height: "64px",
            width: "64px",
            fontSize: "54px",
            padding: "5px",
          }}
        ></Avatar>
      </Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        Daylytic ©{new Date().getFullYear()} Created by Łukasz "iDarkQ"
      </Footer>
    </AntLayout>
  );
};
