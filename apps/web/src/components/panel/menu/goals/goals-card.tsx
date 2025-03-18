import { Card, Flex, Progress, Tooltip, Typography } from "antd";
import { clsx } from "clsx";

import styles from "./goals.module.css";

interface MenuGoalsCardProps {
  title: string;
  lastUpdated: string;
  percentage: number;
  id: string;
  onClick?: (key: string) => void;
  selected?: boolean;
}

export const GoalsCard = ({
  title,
  percentage,
  id,
  onClick,
  selected,
  lastUpdated,
}: MenuGoalsCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Card
      className={clsx(styles.card, selected && styles.selected, styles.selectable)}
      key={id}
      onClick={handleClick}
    >
      <Typography.Title level={4}>
        <Flex align="start" justify="space-between">
          {title}{" "}
          <Progress
            type="circle"
            percent={Math.floor(percentage)}
            size={20}
            strokeColor={
              selected ? "var(--ant-menu-item-selected-color)" : "var(--ant-color-text-heading)"
            }
          />
        </Flex>
      </Typography.Title>
      <Tooltip title="Includes only work on tasks">Last worked on {lastUpdated}</Tooltip>
    </Card>
  );
};
