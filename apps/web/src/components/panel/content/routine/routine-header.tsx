import { Flex, Tooltip, Badge } from "antd";
import { styles } from ".";
import { useTask } from "~/providers/task";
import { ContentTitle } from "../";
import dayjs from "dayjs";
import { useUser } from "~/providers/user";
import { getBadgeColor } from "~/utils/menu-items";

export const RoutineHeader = () => {
  const { tasks } = useTask();
  const { profile } = useUser();
  const tasksToDoCount = tasks.filter(
    (task) => !task.isCompleted && task.taskType === "ROUTINE",
  ).length;

  const hour = dayjs().utc().tz(profile?.timeZone).hour();

  return (
    <Flex justify="start" gap="small" className="ant-typography">
      <ContentTitle title="Routine" />
      {tasksToDoCount > 0 && (
        <Tooltip
          title={`You still have ${tasksToDoCount} ${tasksToDoCount > 1 ? "tasks" : "task"} to do today.`}
        >
          <Badge
            className={styles.badge}
            color={getBadgeColor(tasksToDoCount, hour)}
            count={tasksToDoCount}
          />
        </Tooltip>
      )}
    </Flex>
  );
};
