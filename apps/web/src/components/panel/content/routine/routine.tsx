import { Input, List, theme, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";

import styles from "./routine.module.css";
import { RoutineCard } from "./routine-card";
import clsx from "clsx";
import { generateTasks } from "utils/utils";

const { Title } = Typography;

export interface Task {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export const ContentRoutine = () => {
  const tasks = generateTasks();

  return (
    <Content id={styles.content}>
      <Title level={1}>Routine</Title>
      <Input
        size="large"
        className={clsx(styles.input, "ant-list")}
        prefix={<PlusOutlined />}
        placeholder="Add new task"
      />
      <List
        itemLayout="vertical"
        dataSource={tasks}
        id={styles["tasks-list"]}
        renderItem={(item, _) => RoutineCard(item)}
      />
    </Content>
  );
};
