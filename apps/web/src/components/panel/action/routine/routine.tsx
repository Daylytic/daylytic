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
    if (!selectedTask && tasks.length > 0) {
      const task = tasks.find((task) => task.id === id);
      setSelectedTask(task);
      // return () => {
      //   setSelectedTask(undefined); // Reset selectedTask when the component unmounts
      // };
    }
  }, [selectedTask, tasks, setSelectedTask]);

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
