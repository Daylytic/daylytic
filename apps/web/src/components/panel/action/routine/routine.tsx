import { Flex } from "antd";
import { useDailyTasks } from "providers/daily-tasks";
import { useEffect } from "react";
import { RoutineInputs } from "./routine-inputs";
import { RoutineSettings } from "./routine-settings";
import styles from "./routine.module.css";
import Editor from "components/common/editor/editor";

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
      <RoutineInputs />
      <RoutineSettings />
      <Editor />
    </Flex>
  );
};
