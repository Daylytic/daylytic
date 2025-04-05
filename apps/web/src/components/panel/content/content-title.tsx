import { Flex, Typography } from "antd";
import { styles, ContentHeaderAction } from ".";

interface ContentTitleProps {
  title: string;
}

export const ContentTitle = ({ title }: ContentTitleProps) => (
  <Flex justify="start" align="center" gap="small" wrap={true}>
    <ContentHeaderAction />
    <Typography.Title level={1} className={styles.title}>
      {title}
    </Typography.Title>
  </Flex>
);
