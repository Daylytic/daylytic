import { Badge, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router";
import { styles } from "~/components/layout";
import { useLayout } from "~/providers/layout";
import { useTask } from "~/providers/task";
import { Task } from "~/types/task";
import { dateFormat } from "~/utils/date";
import { getCalendarRoute } from "~/utils/routes";

export const useHero = () => {
  const navigate = useNavigate();
  const { tasks } = useTask();

  const { setShowAction } = useLayout();

  const projectTasks = tasks.filter((task) => task.taskType === "PROJECT");
  const projectDate: Record<string, Task[]> = projectTasks.reduce(
    (acc, task) => {
      if (task.deadline) {
        // Normalize the deadline to the start of the day.
        const day: Dayjs = dayjs(task.deadline).startOf("day");
        const key = day.format("YYYY-MM-DD");

        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(task);
      }
      return acc;
    },
    {} as Record<string, Task[]>,
  );

  const getListData = (value: Dayjs) => {
    const formatted = value.format("YYYY-MM-DD");

    for (const key in projectDate) {
      if (key === formatted) {
        return projectDate[key];
      }
    }

    return [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className={styles.cell}>
        {listData.map((item) => (
          <li>
            <Badge status="default" text={item.title} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const handleSelect = (date: dayjs.Dayjs) => {
    navigate(getCalendarRoute(date.format(dateFormat)));
    setShowAction(true);
  };

  return {cellRender, handleSelect}
};
