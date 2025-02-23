import { Flex, Skeleton } from "antd";

export const RoutineHeaderSkeleton = () => (
  <Flex gap={"small"}>
    <Skeleton.Input size="large" active block={true} />
    <Skeleton.Avatar active shape={"circle"} />
  </Flex>
);
