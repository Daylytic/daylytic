import { message } from "antd";
import { useDailyTasks } from "providers/daily-tasks";
import { useState } from "react";

export const useTaskInput = () => {
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false);
  const { createTask } = useDailyTasks();

  const handleCreateTask = async () => {
    const trimmedTask = newTask.trim();
    if (!trimmedTask) {
      return;
    }

    setLoading(true);
    try {
      await createTask(trimmedTask);
      setNewTask("");
      message.success("Task added successfully");
    } catch {
      message.error("Failed to add task. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  return {
    handleInputChange,
    handleCreateTask,
    loading,
    newTask,
  };
};
