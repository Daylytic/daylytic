import { Flex, Skeleton } from "antd";

interface TagSkeletonProps {
  tagCount: number;
}

export const TagsSkeleton = ({ tagCount }: TagSkeletonProps) => (
  <Flex gap="small">
    {[...Array(tagCount)].map((_, i) => (
      <Skeleton.Button key={i} size="small" active block={true} />
    ))}
  </Flex>
);
