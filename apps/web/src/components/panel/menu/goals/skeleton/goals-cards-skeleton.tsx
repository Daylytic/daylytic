import { Flex, Skeleton } from "antd";

export const GoalsCardsSkeleton = () => (
  <Flex vertical gap="small">
    <Skeleton.Node active style={{ width: "100%" }} />
    <Skeleton.Node active style={{ width: "100%" }} />
    <Skeleton.Node active style={{ width: "100%" }} />
  </Flex>
);