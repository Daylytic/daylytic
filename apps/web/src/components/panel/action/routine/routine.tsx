import Title from "antd/es/typography/Title";
import { Flex } from "antd";
import { useDailyTasks } from "providers/daily-tasks";
import { useEffect, useState } from "react";
import { CreateTagModal } from "./create-tag-modal";
import { RoutineInputs } from "./routine-inputs";
import { RoutineOptions } from "./routine-options";
import { RoutineActions } from "./routine-actions";

export const Routine = ({ id }) => {
  const { tasks, setSelectedTask, selectedTask } = useDailyTasks();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!selectedTask && tasks.length > 0) {
      const task = tasks.find((task) => task.id === id);
      setSelectedTask(task);
      return () => {
        setSelectedTask(undefined); // Reset selectedTask when the component unmounts
      };
    }
  }, [
    selectedTask,
    tasks,
    setSelectedTask,
    () => {
      console.log("UNMOUBNT!");
    },
  ]);

  if (!selectedTask) {
    return <></>;
  }

  return (
    <>
      <CreateTagModal setOpen={setOpen} open={open} />

      <Title level={2}>Task</Title>
      <Flex vertical gap={"4px"}>
        <RoutineInputs />
        <RoutineOptions open={open} setOpen={setOpen} />
      </Flex>
      <div style={{ flex: 1 }}></div>
      <RoutineActions />
    </>
  );
};
