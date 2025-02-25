import { Flex, Skeleton } from "antd";

export const TaskEditorSkeleton = () => (
  <Flex vertical gap={"small"}>
    <Skeleton.Button active block={true} />
    <Skeleton active />
  </Flex>
);
