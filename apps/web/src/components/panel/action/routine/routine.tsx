import { Flex, message } from "antd";
import { useEffect } from "react";
import { useDailyTasks } from "providers/daily-tasks";
import { useNavigate, useParams } from "react-router";
import { styles } from ".";
import Sider from "antd/es/layout/Sider";
import { TaskHeader, TaskSettings, TaskEditor } from "components/common/task";
import { Routes } from "utils/routes";

export const Routine = () => {
  const { taskId } = useParams();

  const { tasks, selectedTask, fetched, updateTask, deleteTask } = useDailyTasks();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTask.current === undefined) {
      const task = tasks.find((task) => task.id === taskId);
      selectedTask.current = task;

      // If tasks fetched, and selectedTask is not selected, navigate back to /panel/routine
      if (fetched && !task) {
        message.error("This task does not exist");
        navigate(Routes.PANEL_ROUTINE);
      }
    }
  });

  return (
    <Sider width={500} id={styles.sider}>
      <Flex vertical id={styles["wrapper"]} gap={selectedTask.current === undefined ? "small" : 0}>
        <TaskHeader selectedTask={selectedTask!.current} onChange={updateTask} />
        <TaskSettings
          selectedTask={selectedTask!.current}
          onChange={updateTask}
          onConfirmDeletetion={async () => {
            await deleteTask(selectedTask!.current!.id);
            navigate(Routes.PANEL_ROUTINE);
            message.success("Task deleted successfully");
          }}
        />
        <TaskEditor selectedTask={selectedTask!.current} onChange={updateTask} />
      </Flex>
    </Sider>
  );
};
