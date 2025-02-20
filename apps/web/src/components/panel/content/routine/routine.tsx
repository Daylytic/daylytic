import { Badge, Flex, Tooltip, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import styles from "./routine.module.css";
import { RoutineTaskInput } from "./routine-task-input";
import { RoutineList } from "./routine-list";
import { useDailyTasks } from "providers/daily-tasks";

const { Title } = Typography;

export const Routine = () => {
  const { tasks } = useDailyTasks();
  const tasksToDoCount = tasks.filter((task) => !task.isCompleted).length;
  return (
    <Content id={styles.content}>
      <Flex>
        <Title level={1}>Routine</Title>
        <Tooltip
          title={`You still have ${tasksToDoCount} ${tasksToDoCount > 1 ? "tasks" : "task"} to do today.`}
        >
          <Badge count={tasksToDoCount} />
        </Tooltip>
      </Flex>
      <RoutineTaskInput />
      <RoutineList />
    </Content>
  );
};
