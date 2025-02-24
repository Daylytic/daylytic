import { TaskList, TaskCard } from "components/common/task";
import { usePanel } from "hooks/use-panel";
import { useDailyTasks } from "providers/daily-tasks";
import { useTags } from "providers/tag";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { Task } from "types/task";

export const TagList = () => {
  const { tasks, updateTask, fetched, selectedTask } = useDailyTasks();
  const { getContent } = usePanel();
  const navigate = useNavigate();
  const { tags } = useTags();

  const selectedTag = tags.find((tag) => tag.id === getContent());
  if(!selectedTag) {
    return <></>;
  }

  const tasksByTag = tasks.filter((task) => task.tagIds.includes(selectedTag.id));

  return (
    <TaskList
      fetched={fetched}
      tasks={tasksByTag}
      updateTask={(task: Task) => {
        updateTask(task);
      }}
      renderItem={(item: Task, index: number): ReactNode => {
        return (
          <TaskCard
            key={item.id}
            item={item}
            onClick={() => {
              const task = tasks.find((task) => task.id === item.id);
              selectedTask.current = task;
              navigate(`/panel/routine/${item.id}`);
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
