import { Flex, Skeleton } from "antd";

export const RoutineSettingsSkeleton = () => (
  <Flex gap={"small"}>
    <Skeleton.Button active block={true} />
    <Skeleton.Button active block={true} />
    <Skeleton.Button active block={true} />
    <Skeleton.Button active shape={"round"} />
  </Flex>
);
