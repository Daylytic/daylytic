import { Outlet } from "react-router";
import { Calendar as CalendarContent } from "~/components/panel/content/calendar";

export const LayoutCalendar = () => (
  <>
    <CalendarContent />
    <Outlet />
  </>
);
