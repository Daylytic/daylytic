import { App, Grid } from "antd";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useLayout } from "~/providers/layout";
import { useSelectedTask } from "~/providers/selected-task";
import { useTask } from "~/providers/task";
import { Task as TaskType } from "~/types/task";
const { useBreakpoint } = Grid;

export const useAction = () => {
  const { taskId } = useParams();
  const { message } = App.useApp();

  //TODO: In the future fetch all of the tags.
  const { tasks, updateTasks, deleteTask, fetched } = useTask();
  const { selectedTask, setSelectedTask } = useSelectedTask();
  const navigate = useNavigate();
  const { setShowAction } = useLayout();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  useEffect(() => {
    if (selectedTask) return;

    if (fetched) {
      const task = tasks.find((task) => task.id === taskId);
      if (task) {
        setSelectedTask(task);
      } else {
        if (!isMobile) {
          navigate("..");
        }
        setShowAction(false);
      }
    }
  }, [fetched, taskId, tasks]);

  const handleUpdate = async (task: TaskType, immediatelyUpdate: boolean) => {
    if (!selectedTask) return;
    await updateTasks([task], immediatelyUpdate);
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    if (!isMobile) {
      navigate("..");
    }
    setShowAction(false);

    await deleteTask(selectedTask);
    message.success("Task deleted successfully");
  };

  return { selectedTask, handleUpdate, handleDelete };
};
