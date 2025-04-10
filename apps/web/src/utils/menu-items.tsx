import {
  ScheduleOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  AimOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Badge, Tooltip } from "antd";
import { GeneralItem } from "~/components/panel/menu/general";
import { Routes } from "~/utils/routes";

export const getBadgeColor = (tasksRemaining, currentHour) => {
  if (!tasksRemaining) return "var(--ant-green)";
  if (currentHour < 12) return "var(--ant-green)";
  if (currentHour < 16) return "var(--ant-gold)";
  return "var(--ant-color-error)";
};

const getTooltipText = (tasksRemaining, currentHour) => {
  if (!tasksRemaining) return "All tasks completed";
  if (currentHour < 12)
    return "It is just beginning of the day, you still have time to do your tasks.";
  if (currentHour < 16) return "When you find a while, try to finish your routine.";
  return "You have very little time. Try to find time to finish your routine.";
};

export const getGeneralMenuItems = (tasksRemaining, currentHour) => [
  {
    key: Routes.PANEL_DASHBOARD,
    label: <GeneralItem text="Dashboard" />,
    icon: <ScheduleOutlined />,
  },
  {
    key: Routes.PANEL_ROUTINE,
    label: (
      <GeneralItem
        text="Routine"
        badge={
          <Badge
            count={
              <Tooltip title={getTooltipText(tasksRemaining, currentHour)}>
                {tasksRemaining ? (
                  <ClockCircleOutlined
                    style={{ color: getBadgeColor(tasksRemaining, currentHour) }}
                  />
                ) : (
                  <CheckOutlined style={{ color: getBadgeColor(tasksRemaining, currentHour) }} />
                )}
              </Tooltip>
            }
          />
        }
      />
    ),
    icon: <UnorderedListOutlined />,
  },
  {
    key: Routes.PANEL_CALENDAR,
    label: <GeneralItem text="Calendar" />,
    icon: <CalendarOutlined />,
  },
  {
    key: Routes.PANEL_TIMELYTIC,
    label: <GeneralItem text="Timelytic" />,
    icon: <AimOutlined />,
  },
];
