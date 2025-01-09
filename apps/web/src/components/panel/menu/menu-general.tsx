import {
  ScheduleOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  ForwardOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Flex, Badge, Menu, Typography, theme } from "antd";
import { MenuGeneralItem } from "./menu-general-item";
import logo from "assets/svgs/logo.svg";

const { Title } = Typography;

const general = [
  {
    key: `dashboard`,
    label: <MenuGeneralItem text="Dashboard" />,
    icon: <ScheduleOutlined />,
  },
  {
    //Routine PLUS if finished routine, green timer means a lot of time left, yellow means less time left, red means little to no time left
    key: `routine`,
    label: (
      <MenuGeneralItem
        text="Routine"
        badge={
          <Badge count={<ClockCircleOutlined style={{ color: "#f5222d" }} />} />
        }
      />
    ),
    icon: <UnorderedListOutlined />,
  },
  {
    key: `upcoming`,
    label: <MenuGeneralItem text="Upcoming" />,
    icon: <ForwardOutlined />,
  },
  {
    key: `calendar`,
    label: <MenuGeneralItem text="Calendar" />,
    icon: <CalendarOutlined />,
  },
];

export const MenuGeneral = () => {
  const {
    token: { paddingXS },
  } = theme.useToken();

  return <>
    <Flex gap={paddingXS}>
      <img height="38px" src={logo} />
      <Title level={2}>Daylytic</Title>
    </Flex>
    <Menu
      mode="inline"
      defaultSelectedKeys={["dashboard"]}
      defaultOpenKeys={["dashboard"]}
      items={general}
    />
  </>
};
