import { Flex, Skeleton } from "antd";
import {styles} from ".";

export const TaskHeaderSkeleton = () => (
  <Flex gap="small" className={styles.header}>
    <Skeleton.Input size="large" active block={true} />
    <Skeleton.Avatar active shape="circle" />
  </Flex>
);
