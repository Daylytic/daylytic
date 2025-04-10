import { App } from "antd";
import { useRoutineList } from "~/components/panel/content/routine/use-routine-list";
import { useTask } from "~/providers/task";
import { Task } from "~/types/task";

export const useRoutineTasks = () => {
  const { updateTasks, tasks, deleteTask } = useTask();
  const { message } = App.useApp();

  const handleTaskClick = () => {
    message.info("You can begin editing tasks once you setup your account.");
  };

  const handleTaskUpdate = async (task: Task): Promise<void> => {
    await updateTasks([task], true);
  };

  const { fetched } = useRoutineList();
  const filteredTasks = tasks
    .filter((p) => p.taskType === "ROUTINE")
    .sort((a, b) => a.position - b.position);

    return {
        filteredTasks,
        deleteTask,
        fetched,
        handleTaskClick,
        handleTaskUpdate,
    }
};
