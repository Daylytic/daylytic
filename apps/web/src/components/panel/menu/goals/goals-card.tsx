import { Card, Typography } from "antd";
import { clsx } from "clsx";

import styles from "./goals.module.css";

interface MenuGoalsCardProps {
  title: string;
  description: string;
  id: string;
  onClick?: (key: string) => void;
  selected?: boolean;
}

export const GoalsCard = ({
  title,
  description,
  id,
  onClick,
  selected,
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
      <Typography.Title level={4}>{title}</Typography.Title>
      {description}
    </Card>
  );
};