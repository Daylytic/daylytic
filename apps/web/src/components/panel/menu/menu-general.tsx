import {
  ScheduleOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  ForwardOutlined,
  CalendarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Flex, Badge, Menu, Typography, theme, Button } from "antd";
import { MenuGeneralItem } from "./menu-general-item";
import logo from "assets/svgs/logo.svg";
import { useMenuController } from "providers/menu-controller";

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
  const { setMenu, menu } = useMenuController();

  const {
    token: { fontSizeHeading4, paddingXS },
  } = theme.useToken();

  return (
    <>
      <Flex
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Flex gap={paddingXS}>
          <img height="38px" src={logo} />
          <Title level={2} style={{ marginBottom: 0 }}>
            Daylytic
          </Title>
        </Flex>
        <Button shape="circle" type="text">
          <SettingOutlined style={{ fontSize: fontSizeHeading4 }} />
        </Button>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={[menu]}
        selectedKeys={[menu]}
        defaultOpenKeys={["dashboard"]}
        onClick={({ item, key, keyPath }) => {
          setMenu(key);
        }}
        items={general}
      />
    </>
  );
};
