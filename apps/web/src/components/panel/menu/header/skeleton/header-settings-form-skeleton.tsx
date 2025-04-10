import { Card, Skeleton } from "antd";

export const HeaderSettingsFormSkeleton = () => {
  return (
    <>
      <Card style={{ marginBottom: 24 }}>
        <Skeleton loading active avatar paragraph={{ rows: 1 }} />
      </Card>
      <Skeleton active title={false} paragraph={{ rows: 2 }} />
    </>
  );
};
