import { Flex, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuGeneral } from "./menu-general";
import { MenuGoals } from "./menu-goals";
import { useState } from "react";
import { MenuControllerProvider } from "providers/menu-controller";

export const Menu = () => {
  const {
    token: { borderRadiusLG, paddingMD },
  } = theme.useToken();

  return (
    <Sider
      style={{
        borderRadius: borderRadiusLG,
        padding: paddingMD,
        height: "100%",
        position: "relative",
      }}
      width={400}
    >
      <Flex vertical style={{ height: "100%", display: "flex" }}>
        <MenuControllerProvider>
          <MenuGeneral />

          <MenuGoals />
        </MenuControllerProvider>
      </Flex>
    </Sider>
  );
};
