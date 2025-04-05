import { Task } from "~/types/task";
import { TaskList } from "~/components/common/task/task-list";
import { useList } from ".";

export const RoutineList = () => {
  const { filteredTasks, fetched, handleTaskClick, updateTasks } = useList();
  return (
    <TaskList
      tasks={filteredTasks}
      fetched={fetched}
      handleTaskClick={handleTaskClick}
      handleTaskUpdate={async (task: Task): Promise<void> => {
        await updateTasks([task], true);
      }}
    />
  );
};
