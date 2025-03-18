import { Flex, Skeleton } from "antd";
import clsx from "clsx";
import styles from "./goal-skeleton.module.css";

export const GoalHeaderSkeleton = () => (
  <Flex vertical>
    <Skeleton.Input active={true} size="large" className={clsx("ant-typography", "css-var-rp")} />
    <Skeleton
      active={true}
      title={false}
      paragraph={{ rows: 2 }}
      className={styles.description}
    />
  </Flex>
);
