import { Flex, Skeleton, Typography } from "antd";
import { styles } from ".";
import { useUser } from "~/providers/user";
import { ContentTitle } from "~/components/panel/content/content-title";

const { Title } = Typography;

export const DashboardHeader = () => {
  const user = useUser();
  return (
    <Flex vertical align="start" gap="small" className="ant-typography">
      <ContentTitle title="Dashboard" />
      <Title level={3} className={styles.description}>
        Hello, {user.profile?.name ?? <Skeleton.Input active size="small" />}
      </Title>
    </Flex>
  );
};
