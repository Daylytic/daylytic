import { Flex, Tooltip, Badge, Typography } from "antd";
import { useDailyTasks } from "providers/daily-tasks";

const { Title } = Typography;

export const RoutineHeader = () => {
  const { tasks } = useDailyTasks();
  const tasksToDoCount = tasks.filter((task) => !task.isCompleted).length;

  return (
    <Flex>
      <Title level={1}>Routine</Title>
      <Tooltip
        title={`You still have ${tasksToDoCount} ${tasksToDoCount > 1 ? "tasks" : "task"} to do today.`}
      >
        <Badge count={tasksToDoCount} />
      </Tooltip>
    </Flex>
  );
};
