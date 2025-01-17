import { Card } from "antd";
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
      className={clsx(styles["card"], selected && styles.selected)}
      title={title}
      extra={<a href="#">More</a>}
      key={id}
      onClick={handleClick}
    >
      {description}
    </Card>
  );
};