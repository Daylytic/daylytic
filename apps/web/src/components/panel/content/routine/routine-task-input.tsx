import { PlusOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import { styles, useTaskInput } from ".";

export const RoutineTaskInput = () => {
  const { loading, handleCreateTask, handleInputChange, newTask } = useTaskInput();

  return (
    <Input
      size="large"
      className={styles.input}
      prefix={<PlusOutlined />}
      placeholder="Add a new task"
      value={newTask}
      onChange={handleInputChange}
      onPressEnter={handleCreateTask}
      aria-label="New task input"
      disabled={loading}
      suffix={loading && <Spin size="small" />}
    />
  );
};
