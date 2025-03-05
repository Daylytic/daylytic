import { Flex, message } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { styles } from ".";
import Sider from "antd/es/layout/Sider";
import { TaskHeader, TaskSettings, TaskEditor } from "components/common/task";
import { Routes } from "utils/routes";
import { useGoal } from "providers/goal";

export const Goal = () => {
  const { taskId } = useParams();

  //TODO: In the future fetch all of the tags.
  const { tasks, selectedTask, updateTask, deleteTask } = useGoal();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTask.current === undefined) {
      selectedTask.current = tasks.find((task) => task.id === taskId);
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
            await deleteTask(selectedTask!.current!);
            navigate(Routes.PANEL_GOAL);
            message.success("Task deleted successfully");
          }}
        />
        <TaskEditor selectedTask={selectedTask!.current} onChange={updateTask} />
      </Flex>
    </Sider>
  );
};
