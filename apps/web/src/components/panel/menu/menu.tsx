import { Badge, Card, Flex, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Space, Typography } from "antd";

import {
  CalendarOutlined,
  ClockCircleOutlined,
  FastForwardOutlined,
  ForwardOutlined,
  ScheduleOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { MenuGeneral } from "./menu-general";
import { MenuGoals } from "./menu-goals";

export const Menu = () => {
  const {
    token: { colorBgLayout, borderRadiusLG, paddingMD, paddingXS },
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
        <MenuGeneral />

        <MenuGoals />
      </Flex>
    </Sider>
  );
};
