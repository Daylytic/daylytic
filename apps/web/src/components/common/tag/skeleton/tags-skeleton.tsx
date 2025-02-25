import { Flex, Skeleton } from "antd";

interface TagSkeletonProps {
  tagCount: number;
}

export const TagsSkeleton = ({ tagCount }: TagSkeletonProps) => (
  <Flex gap="small">
    {[...Array(tagCount)].map((x, i) => (
      <Skeleton.Button size="small" active block={true} />
    ))}
  </Flex>
);
