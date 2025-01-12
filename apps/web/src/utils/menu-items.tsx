import {
  ScheduleOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  ForwardOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { ContentGoals } from "components/panel/content/content-goals";
import { ContentRoutine } from "components/panel/content/routine/routine";
import { MenuGeneralItem } from "components/panel/menu/menu-general-item";

export const MENU_KEYS = {
  DASHBOARD: "dashboard",
  ROUTINE: "routine",
  UPCOMING: "upcoming",
  CALENDAR: "calendar",
  GOALS: "goals",
};

export const CONTENT_KEYS = {
  ROUTINE: "routine",
  GOAL: "goal",
};

export const ComponentMap = {
    [MENU_KEYS.DASHBOARD]: null,
    [MENU_KEYS.ROUTINE]: ContentRoutine,
    [MENU_KEYS.UPCOMING]: null,
    [MENU_KEYS.CALENDAR]: null,
    [MENU_KEYS.GOALS]: ContentGoals,
  };

export const getGeneralMenuItems = () => [
  {
    key: MENU_KEYS.DASHBOARD,
    label: <MenuGeneralItem text="Dashboard" />,
    icon: <ScheduleOutlined />,
  },
  {
    //Routine PLUS if finished routine, green timer means a lot of time left, yellow means less time left, red means little to no time left
    key: MENU_KEYS.ROUTINE,
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
    key: MENU_KEYS.UPCOMING,
    label: <MenuGeneralItem text="Upcoming" />,
    icon: <ForwardOutlined />,
  },
  {
    key:MENU_KEYS.CALENDAR,
    label: <MenuGeneralItem text="Calendar" />,
    icon: <CalendarOutlined />,
  },
];
