import { Card, Flex } from "antd";
import { CELL_SIZE, DAY_LABELS, styles, useGrid } from ".";
import { GridCell } from "~/components/panel/content/dashboard/dashboard-grid-cell";

interface DashboardGridProps {
  year: number;
}

export const DashboardGrid = ({ year }: DashboardGridProps) => {
  const { weeks, mergedMonthLabels, getColorForTasks } = useGrid(year);

  return (
    <Flex gap="small">
      <Card title={`${year} Progress`} className={styles.grid}>
        <table className={styles.table}>
          <colgroup>
            <col style={{ width: "40px" }} />
            {weeks.map((_, index) => (
              <col key={index} style={{ width: `${CELL_SIZE}px` }} />
            ))}
          </colgroup>

          {/* Month headers */}
          <thead>
            <tr style={{ height: `${CELL_SIZE}px` }}>
              <th
                style={{ width: "40px", height: `${CELL_SIZE}px`, lineHeight: `${CELL_SIZE}px` }}
              ></th>
              {mergedMonthLabels.map((month, index) => (
                <th
                  key={index}
                  colSpan={month.colSpan}
                  style={{
                    height: `${CELL_SIZE}px`,
                    lineHeight: `${CELL_SIZE}px`,
                  }}
                  className={styles.month}
                >
                  <div style={{ padding: "0 2px" }}>{month.label}</div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Day grid */}
          <tbody>
            {DAY_LABELS.map((dayLabel, dayIndex) => (
              <tr key={dayIndex} style={{ height: `${CELL_SIZE}px` }}>
                <td
                  style={{
                    height: `${CELL_SIZE}px`,
                    lineHeight: `${CELL_SIZE}px`,
                  }}
                  className={styles.day}
                >
                  {dayLabel}
                </td>
                {weeks.map((week, weekIndex) => (
                  <GridCell
                    key={weekIndex}
                    dayData={week.days[dayIndex]}
                    getColorForTasks={getColorForTasks}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Flex>
  );
};
