import { PlusOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import { styles, useTaskInput } from ".";

export const RoutineTaskInput = () => {
  const { isValidLength, loading, handleCreateTask, handleInputChange, newTask } = useTaskInput();

  return (
    <Input
      size="large"
      className={styles.input}
      prefix={<PlusOutlined />}
      placeholder="Create A New task"
      value={newTask}
      onChange={handleInputChange}
      onPressEnter={handleCreateTask}
      status={newTask.length > 0 && !isValidLength(newTask) ? "error" : undefined}
      aria-label="New task input"
      disabled={loading}
      suffix={loading && <Spin size="small" />}
      data-tour-id="routine-task-input"
    />
  );
};
