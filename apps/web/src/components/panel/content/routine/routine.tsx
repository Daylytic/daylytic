import { Input, List, message, Spin, theme, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./routine.module.css";
import { RoutineCard } from "./routine-card";
import clsx from "clsx";
import { useState } from "react";
import { useDailyTasks } from "providers/daily-tasks";

const { Title } = Typography;

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  priority: number;
  title: string;
  description: string;
  tags: Tag[];
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  deadline: string;
}

export const ContentRoutine = () => {
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(false); // Local loading state
  const { tasks, createTask } = useDailyTasks();

  const handleCreateTask = async () => {
    if (newTask.trim()) {
      setLoading(true); // Start loading
      try {
        await createTask(newTask.trim());
        setNewTask(""); // Clear input after success
        message.success("Task added successfully");
      } catch {
        message.error("Failed to add task. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  return (
    <Content id={styles.content}>
      <Title level={1}>Routine</Title>
      <Input
        size="large"
        className={clsx(styles.input, "ant-list")}
        prefix={<PlusOutlined />}
        placeholder="Add a new task"
        value={newTask}
        onChange={handleInputChange}
        onPressEnter={handleCreateTask}
        aria-label="New task input"
        disabled={loading} // Disable input while loading
        suffix={loading && <Spin size="small" />} // Show spinner when loading
      />
      <List
        itemLayout="vertical"
        dataSource={tasks}
        id={styles["tasks-list"]}
        renderItem={(item) => <RoutineCard key={item.id} {...item} />}
      />
    </Content>
  );
};
