import {
  ScheduleOutlined,
  ClockCircleOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  AimOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { Badge, Tooltip } from "antd";
import Countdown from "antd/es/statistic/Countdown";
import dayjs from "dayjs";
import { useClock } from "~/components/panel/content/timelytic";
import { GeneralItem } from "~/components/panel/menu/general";
import { clockFormat } from "~/utils/date";
import { Routes } from "~/utils/routes";
import { styles } from "~/components/panel/menu/general";
import clsx from "clsx";

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

export const getGeneralMenuItems = (tasksRemaining, currentHour) => {
  const { percent, deadline, isRunning, remainingTime } = useClock(false);

  return [
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
      label: (
        <GeneralItem
          text="Timelytic"
          badge={
            deadline &&
            (isRunning && percent != 100 ? (
              <Countdown
                className={clsx("ant-statistic-content-value", styles.clock)}
                value={deadline.valueOf()}
                format={clockFormat}
              />
            ) : (
              <span className="ant-statistic-content-value">
                {dayjs(Math.max(remainingTime, 0)).format(clockFormat)}
              </span>
            ))
          }
        />
      ),
      icon: <AimOutlined />,
    },
  ];
};
