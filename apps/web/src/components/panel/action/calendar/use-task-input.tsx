import { TASK_TITLE_MAX_LENGTH, TASK_TITLE_MIN_LENGTH } from "@daylytic/shared/constants";
import { App, InputRef } from "antd";
import { useTask } from "~/providers/task";
import { useUser } from "~/providers/user";
import { useRef, useState } from "react";
import dayjs from "dayjs";
import { useParams } from "react-router";
import { dateWithTimeFormat } from "~/utils/date";

export const useTaskInput = () => {
  const { date } = useParams();
  const [newTask, setNewTask] = useState("");
  const { profile } = useUser();
  const [loading, setLoading] = useState(false);
  const { createTask, updateTasks } = useTask();
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

      const task = await createTask(trimmed, "EVENT", undefined, profile!.id);
      if (!task) return;

      const today = dayjs().utc();
      const isToday = date === today.format("YYYY-MM-DD");

      const deadlineTime = isToday ? today.format("HH:mm") : "00:00";

      task.deadline = dayjs(`${date} ${deadlineTime}`, dateWithTimeFormat).utc().toISOString();

      await updateTasks([task], true);
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
