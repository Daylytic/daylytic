import { TaskList, TaskCard } from "components/common/task";
import { useDailyTasks } from "providers/daily-tasks";
import { useTags } from "providers/tag";
import { ReactNode } from "react";
import { useNavigate } from "react-router";
import { Task } from "types/task";
import { getTaskRoute } from "utils/routes";

export const RoutineList = () => {
  const { tasks, updateTask, fetched, selectedTask } = useDailyTasks();
  const navigate = useNavigate();
  const { tags } = useTags();

  return (
    <TaskList
      orderable={true}
      fetched={fetched}
      tasks={tasks}
      updateTask={(task: Task) => {
        updateTask(task);
      }}
      renderItem={(item: Task): ReactNode => {
        return (
          <TaskCard
            orderable={true}
            key={item.id}
            item={item}
            onClick={() => {
              const task = tasks.find((task) => task.id === item.id);
              selectedTask.current = task;
              navigate(getTaskRoute(item.id));
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
