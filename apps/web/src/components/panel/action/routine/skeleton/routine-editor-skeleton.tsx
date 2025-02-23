import { Flex, Skeleton } from "antd";

export const RoutineEditorSkeleton = () => (
  <Flex vertical gap={"small"}>
    <Skeleton.Button active block={true} />
    <Skeleton active />
  </Flex>
);
