import { Input, List, message, theme, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";

import styles from "./routine.module.css";
import { RoutineCard } from "./routine-card";
import clsx from "clsx";
import { useDailyTasks } from "hooks/use-daily-tasks";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";

const { Title } = Typography;

export interface Task {
  id: string;
  title: string;
}

export const ContentRoutine = () => {
  const [newTask, setNewTask] = useState("");
  const [cookies] = useCookies(["token"]);
  const { tasks, createTask } = useDailyTasks(cookies.token);

  const handleCreateTask = async () => {
    if (newTask.trim()) {
      try {
        await createTask(newTask.trim());
        setNewTask(""); // Clear input after success
        message.success("Task added successfully");
      } catch {
        message.error("Failed to add task. Please try again.");
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