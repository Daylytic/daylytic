import { Flex } from "antd";
import { useEffect } from "react";
import { RoutineSettings } from "./routine-settings";
import styles from "./routine.module.css";
import { RoutineHeader } from "./routine-header";
import { useDailyTasks } from "providers/daily-tasks";
import { Lexical } from "components/common/editor";

export const Routine = ({ id }) => {
  const { tasks, selectedTask, setSelectedTask } = useDailyTasks();

  useEffect(() => {
    const task = tasks.find((task) => task.id === id);
    setSelectedTask(task);
  }, [id]);

  if (!selectedTask) {
    return <></>;
  }

  return (
    <Flex vertical id={styles["wrapper"]}>
      <RoutineHeader />
      <RoutineSettings />
      <Lexical />
    </Flex>
  );
};
