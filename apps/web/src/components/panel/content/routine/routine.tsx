import { Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import styles from "./routine.module.css";
import { RoutineTaskInput } from "./routine-task-input";
import { RoutineList } from "./routine-list";

const { Title } = Typography;

export const Routine = () => (
  <Content id={styles.content}>
    <Title level={1}>Routine</Title>
    <RoutineTaskInput />
    <RoutineList />
  </Content>
);
