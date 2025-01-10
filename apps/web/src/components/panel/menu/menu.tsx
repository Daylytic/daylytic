import { Flex, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { MenuGeneral } from "./menu-general";
import { MenuGoals } from "./menu-goals";
import { useState } from "react";

export const Menu = () => {
  const {
    token: { borderRadiusLG, paddingMD },
  } = theme.useToken();

  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  
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
        <MenuGeneral selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>

        <MenuGoals selectedMenu={selectedMenu} setSelectedMenu={setSelectedMenu}/>
      </Flex>
    </Sider>
  );
};
