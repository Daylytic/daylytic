import Title from "antd/es/typography/Title";
import { Flex } from "antd";
import { useDailyTasks } from "providers/daily-tasks";
import { useEffect } from "react";
import { RoutineInputs } from "./routine-inputs";
import { RoutineOptions } from "./routine-options";
import { RoutineActions } from "./routine-actions";

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
    <>
      <Title level={2}>Task</Title>
      <Flex vertical gap={"small"}>
        <RoutineInputs />
        <RoutineOptions />
      </Flex>
      <RoutineActions />
    </>
  );
};
