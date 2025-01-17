import { List } from "antd";
import { useDailyTasks } from "providers/daily-tasks";
import { RoutineCard } from "./routine-card";
import styles from "./routine.module.css";

export const RoutineList = () => {
  const { tasks } = useDailyTasks();
  return (
    <List
      itemLayout="vertical"
      dataSource={tasks}
      id={styles["tasks-list"]}
      renderItem={(item) => <RoutineCard key={item.id} item={item} />}
    />
  );
};
