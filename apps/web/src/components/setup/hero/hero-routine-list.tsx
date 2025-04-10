import { TaskList } from "~/components/common/task/task-list";
import { useRoutineTasks } from ".";

export const HeroRoutineList = () => {
  const { filteredTasks, deleteTask, fetched, handleTaskClick, handleTaskUpdate } =
    useRoutineTasks();

  return (
    <TaskList
      tasks={filteredTasks}
      showDelete={true}
      onDelete={deleteTask}
      fetched={fetched}
      handleTaskClick={handleTaskClick}
      handleTaskUpdate={handleTaskUpdate}
    />
  );
};
