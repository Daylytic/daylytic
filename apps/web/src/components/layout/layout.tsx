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
import { ReactNode, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Logo from "assets/svgs/logo.svg";

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
    href: "/#hero",
  },
  { key: "about", title: <span>About</span>, href: "/#about" },
  { key: "faq", title: "FAQ", href: "/#faq" },
  { key: "contact", title: "Contact", href: "/#contact" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const user = useUser();

  const [cachedProfile, setCachedProfile] = useState({
    picture: user.profile?.picture,
  });

  // Update cached profile if the picture URL changes
  useEffect(() => {
    if (user.profile?.picture !== cachedProfile.picture) {
      setCachedProfile({ picture: user.profile?.picture });
    }
  }, [user.profile?.picture]);

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

        {cachedProfile.picture ? (
          <Avatar
            src={
              <img
                src={cachedProfile.picture}
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
        ) : (
          <></>
        )}
      </Header>
      <Content>{children}</Content>
      <Footer style={{ textAlign: "center" }}>
        Daylytic ©{new Date().getFullYear()} Created by Łukasz "iDarkQ"
      </Footer>
    </AntLayout>
  );
};
