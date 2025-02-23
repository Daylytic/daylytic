import { Content } from "antd/es/layout/layout";
import styles from "./routine.module.css";
import { RoutineHeader, RoutineList, RoutineTaskInput } from ".";

export const Routine = () => (
  <Content id={styles.content}>
    <RoutineHeader />
    <RoutineTaskInput />
    <RoutineList />
  </Content>
);
