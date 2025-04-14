import { Divider, Flex } from "antd";
import { Outlet, redirect } from "react-router";
import { CalendarTaskInput, styles, useCalendar } from ".";
import { CalendarHeader } from "~/components/panel/action/calendar/calendar-header";
import { Routes } from "~/utils/routes";
import { Action } from "~/components/panel/action/action";

export const Calendar = () => {
  const { renderTasks, taskId, parsedDate, date } = useCalendar();
  if (!parsedDate.isValid()) {
    redirect(Routes.PANEL_CALENDAR);
    return;
  }

  return (
    <Action>
      <Flex vertical id={styles["wrapper"]}>
        <CalendarHeader calendar={date!} />
        <CalendarTaskInput />
        {renderTasks()}
      </Flex>
      {taskId && (
        <>
          <Divider type="horizontal" />
          <Outlet />
        </>
      )}
    </Action>
  );
};
