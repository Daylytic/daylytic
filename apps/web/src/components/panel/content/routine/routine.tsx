import { Input, List, theme, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";

import styles from "./routine.module.css";
import { RoutineCard } from "./routine-card";

const { Title } = Typography;

export interface Task {
  title: string;
  description: string;
  tags: string[];
}

const generateTasks = (numberOfTasks: number): Task[] => {
  return Array.from({ length: numberOfTasks }, () => ({
    title: faker.lorem.words(5),
    description: faker.lorem.sentence({ min: 5, max: 15 }),
    tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.lorem.word()
    ),
  }));
};

export const ContentRoutine = () => {
  const tasks = generateTasks(7);

  return (
    <Content id={styles.content}>
      <Title level={1}>Routine</Title>
      <Input
        size="large"
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
