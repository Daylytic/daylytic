import { TASK_TITLE_MAX_LENGTH, TASK_TITLE_MIN_LENGTH } from "@daylytic/shared/constants";
import { App, InputRef } from "antd";
import { useTask } from "~/providers/task";
import { useUser } from "~/providers/user";
import { useRef, useState } from "react";

export const useTaskInput = () => {
  const [newTask, setNewTask] = useState("");
  const { profile } = useUser();
  const [loading, setLoading] = useState(false);
  const { createTask } = useTask();
  const { message } = App.useApp();
  const inputRef = useRef<InputRef>(null);

  const isValidLength = (name) => {
    return !(name.length < TASK_TITLE_MIN_LENGTH || name.length > TASK_TITLE_MAX_LENGTH);
  };

  const handleCreateTask = async () => {
    const trimmed = newTask.trim();
    if (!isValidLength(trimmed)) {
      message.error(
        `Task name must be between ${TASK_TITLE_MIN_LENGTH} and ${TASK_TITLE_MAX_LENGTH} characters.`,
      );
      return;
    }

    setLoading(true);
    try {
      if (!profile?.id) {
        return;
      }

      await createTask(trimmed, "ROUTINE", undefined, profile!.id);
      setNewTask("");
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 0);
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
    isValidLength,
    inputRef,
  };
};
