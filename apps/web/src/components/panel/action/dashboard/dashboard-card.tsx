import { Card, Flex, Typography } from "antd";
import { clsx } from "clsx";

import { styles } from ".";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  description: ReactNode[];
  id: number;
  onClick?: () => void;
  selected?: boolean;
}

export const DashboardCard = ({
  title,
  description,
  id,
  onClick,
  selected,
}: DashboardCardProps) => {
  return (
    <Card
      className={clsx(styles.card, selected && styles.selected, styles.selectable)}
      key={id}
      onClick={onClick ?? undefined}
    >
      <Typography.Title level={4}>
        <Flex align="start" justify="space-between">
          {title}
        </Flex>
      </Typography.Title>
      {description.map((desc, index) => (
        <Typography.Text key={index} className={styles["description-item"]}>{desc}</Typography.Text>
      ))}
    </Card>
  );
};
