import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { createDayjs } from "~/utils/dayjs";
import { useUser } from "~/providers/user";

import { useMemo } from "react";
import { theme } from "antd";
import dayjs from "dayjs";
import { generate } from "@ant-design/colors";
import { useTask } from "~/providers/task";
import { dateFormat } from "~/utils/date";

dayjs.extend(utc);
dayjs.extend(timezone);

interface DayData {
  date: Date;
  tasks: number;
}

interface Week {
  days: (DayData | null)[];
}

interface MergedMonthLabel {
  label: string;
  colSpan: number;
}

interface MonthLabelPosition {
  month: number;
  weekIndex: number;
  label: string;
}

export const CELL_SIZE = 12;
export const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

const getMergedMonthLabels = (
  weeks: Week[],
  monthLabelPositions: MonthLabelPosition[],
): MergedMonthLabel[] => {
  const mergedLabels: MergedMonthLabel[] = [];
  let currentMonth: string | null = null;
  let startWeek = 0;

  weeks.forEach((_, weekIndex) => {
    const monthItem = monthLabelPositions.find((item) => item.weekIndex === weekIndex);
    if (monthItem) {
      // Start a new month group if the label has changed
      if (currentMonth !== monthItem.label) {
        if (currentMonth !== null) {
          mergedLabels.push({
            label: currentMonth,
            colSpan: weekIndex - startWeek,
          });
        }
        currentMonth = monthItem.label;
        startWeek = weekIndex;
      }
    }
  });

  // Push the last month group if it exists
  if (currentMonth !== null) {
    mergedLabels.push({
      label: currentMonth,
      colSpan: weeks.length - startWeek,
    });
  }

  return mergedLabels;
};

const generateYearGrid = (year: number, tasksMap: Record<string, number>): Week[] => {
  // Create date objects for the start and end of the year
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  // Find the first Sunday that is on or before the first day of the year
  const current = new Date(startDate);
  current.setDate(current.getDate() - startDate.getDay()); // Go back to previous Sunday

  const weeks: Week[] = [];

  // Generate weeks until we reach the end of the year
  while (current <= endDate) {
    const week: (DayData | null)[] = [];

    // Generate 7 days for each week (Sunday through Saturday)
    for (let i = 0; i < 7; i++) {
      const dateCopy = new Date(current);

      // Check if this date is within our year
      if (dateCopy.getFullYear() === year) {
        const dateStr = dayjs(dateCopy).format("YYYY-MM-DD");
        week.push({
          date: dateCopy,
          tasks: tasksMap[dateStr] || 0,
        });
      } else {
        week.push(null);
      }

      // Move to next day
      current.setDate(current.getDate() + 1);
    }

    weeks.push({ days: week });
  }

  return weeks;
};

const createColorScale = (
  tasksMap: Record<string, number>,
  colorToken: string,
  darkMode: boolean = false,
) => {
  const maxTasks = Math.max(...Object.values(tasksMap), 1); // Ensure at least 1 to avoid division by zero
  const palette = !darkMode
    ? generate(colorToken).slice(2, -4)
    : generate(colorToken).slice(5, 8).reverse();

  return (tasks: number) => {
    if (tasks === 0)
      return darkMode ? "var(--ant-color-fill-tertiary)" : "var(--ant-color-fill-secondary)"; // Default empty cell color
    const index = Math.floor((tasks / maxTasks) * (palette.length - 1));
    return palette[Math.min(index, palette.length - 1)]; // Ensure index is in bounds
  };
};

export const useGrid = (year: number) => {
  const { useToken } = theme;
  const { token } = useToken();
  const { tasks } = useTask();
  const { isDarkMode } = useUser();

  // Calculate tasks map
  const tasksMap = useMemo(
    () =>
      tasks.reduce(
        (acc, task) => {
          if(task.taskType !== "PROJECT") return acc; // Only consider project tasks
          if (task.completedAt && task.isCompleted) {
            const date = createDayjs(task.completedAt).format(dateFormat);

            acc[date] = (acc[date] || 0) + 1;
          }
          return acc;
        },
        {} as Record<string, number>,
      ),
    [tasks],
  );

  // Calculate grid and color scale
  const { weeks, monthLabelPositions, getColorForTasks } = useMemo(() => {
    // Create color gradient function
    const getColorForTasks = createColorScale(tasksMap, token.colorPrimaryText, isDarkMode());

    // Generate the grid
    let weeks = generateYearGrid(year, tasksMap);
    weeks = weeks.filter((week) => week.days.some((day) => day !== null));

    // Calculate month label positions
    const monthLabelPositions = weeks.reduce((acc: MonthLabelPosition[], week, index) => {
      const firstValid = week.days.find((day) => day !== null);
      if (firstValid) {
        const month = firstValid.date.getMonth();
        if (!acc.some((item) => item.month === month)) {
          acc.push({
            month,
            weekIndex: index,
            label: firstValid.date.toLocaleString("default", { month: "short" }),
          });
        }
      }
      return acc;
    }, []);

    return { weeks, monthLabelPositions, getColorForTasks };
  }, [year, tasksMap, token.colorPrimaryText]);

  const mergedMonthLabels = useMemo(
    () => getMergedMonthLabels(weeks, monthLabelPositions),
    [weeks, monthLabelPositions],
  );

  return { weeks, mergedMonthLabels, getColorForTasks };
};
