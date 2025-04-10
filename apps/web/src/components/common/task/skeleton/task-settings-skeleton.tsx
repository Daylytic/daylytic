import { Flex, Skeleton } from "antd";

export const TaskSettingsSkeleton = () => (
  <Flex gap="small">
    <Skeleton.Button active block={true} />
    <Skeleton.Button active block={true} />
    <Skeleton.Button active block={true} />
    <Skeleton.Button active shape="round" />
  </Flex>
);
