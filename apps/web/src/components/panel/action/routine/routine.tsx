import { Flex } from "antd";
import { useEffect } from "react";
import { useDailyTasks } from "providers/daily-tasks";
import { useNavigate, useParams } from "react-router";
import { RoutineHeader, RoutineSettings, styles } from ".";
import { RoutineEditor } from "./routine-editor";
import Sider from "antd/es/layout/Sider";

export const Routine = () => {
  const { taskId } = useParams();

  const { tasks, selectedTask, fetched } = useDailyTasks();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTask.current === undefined) {
      const task = tasks.find((task) => task.id === taskId);
      selectedTask.current = task;

      // If tasks fetched, and selectedTask is not selected, navigate back to /panel/routine
      if (fetched && !task) {
        navigate("/panel/routine");
      }
    }
  });

  return (
    <Sider width={500} id={styles.sider}>
      <Flex vertical id={styles["wrapper"]} gap={selectedTask.current === undefined ? "small" : 0}>
        <RoutineHeader />
        <RoutineSettings />
        <RoutineEditor />
      </Flex>
    </Sider>
  );
};
