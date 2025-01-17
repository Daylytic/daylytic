import {
  ScheduleOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  ForwardOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Badge } from "antd";
import { Routine as RoutineAction } from "components/panel/action/routine";
import { Goals as GoalsContent } from "components/panel/content/goals";
import { Routine as RoutineContent } from "components/panel/content/routine";
import { GeneralItem } from "components/panel/menu/general";

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

export const ContentMap = {
  [MENU_KEYS.DASHBOARD]: null,
  [MENU_KEYS.ROUTINE]: RoutineContent,
  [MENU_KEYS.UPCOMING]: null,
  [MENU_KEYS.CALENDAR]: null,
  [MENU_KEYS.GOALS]: GoalsContent,
};

export const ActionMap = {
  [MENU_KEYS.DASHBOARD]: null,
  [MENU_KEYS.ROUTINE]: RoutineAction,
  [MENU_KEYS.UPCOMING]: null,
  [MENU_KEYS.CALENDAR]: null,
  [MENU_KEYS.GOALS]: null,
};

export const getGeneralMenuItems = () => [
  {
    key: MENU_KEYS.DASHBOARD,
    label: <GeneralItem text="Dashboard" />,
    icon: <ScheduleOutlined />,
  },
  {
    //Routine PLUS if finished routine, green timer means a lot of time left, yellow means less time left, red means little to no time left
    key: MENU_KEYS.ROUTINE,
    label: (
      <GeneralItem
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
    label: <GeneralItem text="Upcoming" />,
    icon: <ForwardOutlined />,
  },
  {
    key: MENU_KEYS.CALENDAR,
    label: <GeneralItem text="Calendar" />,
    icon: <CalendarOutlined />,
  },
];
