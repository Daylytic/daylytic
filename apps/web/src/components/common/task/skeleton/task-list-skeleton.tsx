import { Skeleton } from "antd";

export const TaskListSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, i) => (
        <Skeleton.Button key={i} active style={{ flex: 1, width: "100%" }} />
      ))}
    </>
  );
};
