import { Flex, message } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { styles } from ".";
import Sider from "antd/es/layout/Sider";
import { TaskHeader, TaskSettings, TaskEditor } from "components/common/task";
import { Routes } from "utils/routes";
import { useTask } from "providers/task";
import { useSelectedTask } from "providers/selected-task";

export const Goal = () => {
  const { taskId, goalId } = useParams();

  //TODO: In the future fetch all of the tags.
  const { tasks, updateTasks, deleteTask } = useTask();
  const { selectedTask, setSelectedTask } = useSelectedTask();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedTask === undefined) {
      setSelectedTask(tasks.find((task) => task.id === taskId));
    }
  }, [taskId, tasks]);

  return (
    <Sider width={500} id={styles.sider}>
      <Flex vertical id={styles["wrapper"]} gap={selectedTask === undefined ? "small" : 0}>
        <TaskHeader
          selectedTask={selectedTask}
          onChange={async (task) => await updateTasks({ [goalId!]: [task] }, false)}
        />
        <TaskSettings
          selectedTask={selectedTask}
          onChange={async (task) => {
            await updateTasks({ [goalId!]: [task] }, false);
          }}
          onConfirmDeletetion={async () => {
            await deleteTask(selectedTask!, goalId!);
            navigate(Routes.PANEL_GOAL);
            message.success("Task deleted successfully");
          }}
        />
        <TaskEditor
          selectedTask={selectedTask}
          onChange={async (task) => await updateTasks({ [goalId!]: [task] }, false)}
        />
      </Flex>
    </Sider>
  );
};
