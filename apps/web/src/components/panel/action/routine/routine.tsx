import Title from "antd/es/typography/Title";
import { Flex } from "antd";
import { useDailyTasks } from "providers/daily-tasks";
import { useEffect } from "react";
import { RoutineInputs } from "./routine-inputs";
import { RoutineOptions } from "./routine-options";
import { RoutineActions } from "./routine-actions";
import { InfoCircleOutlined } from "@ant-design/icons";
import { RoutineSettings } from "./routine-settings";
import styles from "./routine.module.css";

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
    </Flex>
  );
};
