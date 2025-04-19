import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Task } from "~/types/task";

interface UseDateTimePickerProps {
  selectedTask: Task;
  onChange: (task: Task) => Promise<void>;
}

export const useDateTimePicker = ({
  selectedTask,
  onChange,
}: UseDateTimePickerProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Dayjs | null>(
    dayjs(selectedTask.deadline).isValid() ? dayjs(selectedTask.deadline) : null,
  );

  // Handle RESET
  const handleReset = () => {
    selectedTask.deadline = "";
    onChange(selectedTask);
    setTempDate(null);
    setIsModalVisible(false);
  };

  const handleOpenModal = () => {
    setTempDate(dayjs(selectedTask.deadline).isValid() ? dayjs(selectedTask.deadline) : null);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (tempDate) {
      selectedTask.deadline = tempDate.toISOString();
      onChange(selectedTask);
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return {
    handleModalCancel, handleModalOk, handleReset, handleOpenModal, isModalVisible, tempDate, setTempDate
  }
};
