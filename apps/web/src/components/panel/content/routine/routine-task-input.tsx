import { PlusOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import clsx from "clsx";
import styles from "./routine.module.css";
import { useTaskInput } from "./use-task-input";

export const RoutineTaskInput = () => {
  const {loading, handleCreateTask, handleInputChange, newTask} = useTaskInput();

  return (
    <Input
      size="large"
      className={clsx(styles.input, "ant-list")}
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
