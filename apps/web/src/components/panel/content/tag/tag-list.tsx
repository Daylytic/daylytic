import { TaskList, TaskCard } from "components/common/task";
import { useDailyTasks } from "providers/daily-tasks";
import { useTags } from "providers/tag";
import { ReactNode } from "react";
import { useNavigate, useParams } from "react-router";
import { Task } from "types/task";
import { getTagRoute } from "utils/routes";

export const TagList = () => {
  const { tasks, updateTask, fetched, selectedTask } = useDailyTasks();
  const { tagId } = useParams();
  const navigate = useNavigate();
  const { tags } = useTags();

  const selectedTag = tags.find((tag) => tag.id === tagId);

  const tasksByTag = selectedTag
    ? tasks.filter((task) => task.tagIds.includes(selectedTag.id))
    : [];

  return (
    <TaskList
      orderable={false}
      fetched={fetched}
      tasks={tasksByTag}
      updateTask={(task: Task) => {
        updateTask(task);
      }}
      renderItem={(item: Task): ReactNode => {
        return (
          <TaskCard
            orderable={false}
            key={item.id}
            item={item}
            onClick={() => {
              const task = tasks.find((task) => task.id === item.id);
              selectedTask.current = task;
              navigate(getTagRoute(tagId!, item.id));
            }}
            onCheckboxChange={async (): Promise<void> => {
              await updateTask({ ...item, isCompleted: !item.isCompleted });
            }}
            tags={tags}
          />
        );
      }}
    />
  );
};
