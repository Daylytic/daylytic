import { Flex } from "antd";
import { useEffect } from "react";
import { useDailyTasks } from "providers/daily-tasks";
import { useNavigate } from "react-router";
import { RoutineHeader, RoutineSettings, styles } from ".";
import { RoutineEditor } from "./routine-editor";

interface RoutineProps {
  id: string;
}

export const Routine = ({ id }: RoutineProps) => {
  const { tasks, selectedTask, fetched } = useDailyTasks();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTask.current === undefined) {
      const task = tasks.find((task) => task.id === id);
      selectedTask.current = task;

      // If tasks fetched, and selectedTask is not selected, navigate back to /panel/routine
      if (fetched && !task) {
        navigate("/panel/routine");
      }
    }
  });

  return (
    <Flex vertical id={styles["wrapper"]} gap={selectedTask.current === undefined ? "small" : 0}>
      <RoutineHeader />
      <RoutineSettings />
      <RoutineEditor />
    </Flex>
  );
};
