import { useRoutineList } from "~/components/panel/content/routine/use-routine-list";
import { useSelectedTask } from "~/providers/selected-task";
import { useTags } from "~/providers/tag";
import { useTask } from "~/providers/task";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { Task } from "~/types/task";
import { getTagRoute } from "~/utils/routes";

export const useList = () => {
  const { tagId } = useParams();
  const { tags } = useTags();
  const { tasks, updateTasks } = useTask();

  const selectedTag = tags.find((tag) => tag.id === tagId);

  const tasksByTag = selectedTag
    ? tasks
        .filter((task) => task.tagIds.includes(selectedTag.id))
        .sort((a, b) => a.position - b.position)
    : [];

  const { selectedTask, setSelectedTask } = useSelectedTask();
  const navigate = useNavigate();

  const handleTaskClick = useCallback(
    (task: Task) => {
      if (selectedTask?.id === task.id) {
        navigate(getTagRoute(tagId!));
        setSelectedTask(undefined);

        return;
      }
      setSelectedTask(task);
      navigate(getTagRoute(tagId!, task.id));
    },
    [navigate, selectedTask],
  );

  const { fetched } = useRoutineList();

  return {
    tasksByTag,
    fetched,
    handleTaskClick,
    updateTasks,
  }
};
