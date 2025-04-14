import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Spin } from "antd";
import { styles, useTaskInput } from ".";

export const CalendarTaskInput = () => {
  const { inputRef, isValidLength, loading, handleCreateTask, handleInputChange, newTask } =
    useTaskInput();

  return (
    <Input
      ref={inputRef}
      size="large"
      className={styles.input}
      prefix={
        <Button
          size="small"
          type={newTask.length > 0 ? "primary" : "text"}
          icon={<PlusOutlined />}
          disabled={!(newTask.length > 0)}
          onClick={handleCreateTask}
        />
      }
      placeholder="Create A New task"
      value={newTask}
      onChange={handleInputChange}
      onPressEnter={handleCreateTask}
      status={newTask.length > 0 && !isValidLength(newTask) ? "error" : undefined}
      aria-label="New task input"
      disabled={loading}
      suffix={loading && <Spin size="small" />}
    />
  );
};
