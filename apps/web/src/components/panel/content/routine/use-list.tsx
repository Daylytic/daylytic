import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Task } from "~/types/task";
import { getTaskRoute, Routes } from "~/utils/routes";
import { useSelectedTask } from "~/providers/selected-task";
import { useTask } from "~/providers/task";
import { useRoutineList } from ".";
import { useLayout } from "~/providers/layout";

export const useList = () => {
  const { updateTasks, tasks } = useTask();
  const { taskId } = useParams();
  const { selectedTask, setSelectedTask } = useSelectedTask();
  const navigate = useNavigate();
  const { setShowAction } = useLayout();

  const handleTaskClick = useCallback(
    (task: Task) => {
      if (selectedTask?.id === task.id && taskId) {
        navigate(Routes.PANEL_ROUTINE);
        setSelectedTask(undefined);

        return;
      }
      setSelectedTask(task);
      navigate(getTaskRoute(task.id));
      setShowAction(true);
    },
    [navigate, selectedTask],
  );

  const { fetched } = useRoutineList();
  const filteredTasks = tasks
    .filter((p) => p.taskType === "ROUTINE")
    .sort((a, b) => a.position - b.position);

  return {
    filteredTasks,
    fetched,
    handleTaskClick,
    updateTasks,
  };
};
