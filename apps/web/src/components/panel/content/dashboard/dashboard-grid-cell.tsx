import { Tooltip } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { CELL_SIZE, styles } from ".";

export const GridCell = ({ dayData, getColorForTasks }) => {
  const [hovered, setHovered] = useState(false);

  if (!dayData) {
    return (
      <td
        style={{
          height: `${CELL_SIZE}px`,
        }}
        className={styles.empty}
      >
        <div style={{ width: CELL_SIZE, height: CELL_SIZE }}></div>
      </td>
    );
  }

  const dateFormatted = dayjs(dayData.date).format("YYYY-MM-DD (ddd)");
  const taskCount = dayData.tasks || 0;

  return (
    <td
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: 0,
        overflow: "hidden",
        height: `${CELL_SIZE}px`,
      }}
    >
      {hovered ? (
        <Tooltip title={`${taskCount} tasks on ${dateFormatted}`}>
          <div
            style={{
              width: CELL_SIZE,
              height: CELL_SIZE,
              backgroundColor: getColorForTasks(taskCount),
            }}
            className={styles.tooltip}
          />
        </Tooltip>
      ) : (
        <div
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
          }}
          className={styles.tooltip}
        />
      )}
    </td>
  );
};
