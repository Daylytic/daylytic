import { Task } from "~/types/task";
import { TaskList } from "~/components/common/task/task-list";
import { useList } from ".";

export const TagList = () => {
  const { tasksByTag, fetched, handleTaskClick, updateTasks } = useList();

  return (
    <TaskList
      tasks={tasksByTag}
      fetched={fetched}
      dnd={false}
      handleTaskClick={handleTaskClick}
      handleTaskUpdate={async (task: Task): Promise<void> => {
        await updateTasks([task], true);
      }}
    />
  );
};
