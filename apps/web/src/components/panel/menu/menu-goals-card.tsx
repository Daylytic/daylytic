import { Card, List } from "antd";
import { clsx } from "clsx";

import styles from "./menu-goals-card.module.css"

interface MenuGoalsCardProps {
  title: string;
  description: string;
  id: string; // Optional key property
  onClick?: (key: string) => void; // Modified onClick to accept the title
  selected?: boolean;
}

export const MenuGoalsCard = ({
  title,
  description,
  id,
  onClick,
  selected,
}: MenuGoalsCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(id); // Pass the title to the onClick handler
    }
  };

  return (
    <Card
      className={clsx(styles.wrapper, selected && styles.selected)}
      title={title}
      extra={<a href="#">More</a>}
      style={{ width: "100%" }}
      key={id} // Applying the key property
      onClick={handleClick} // Using the local handleClick function
    >
      <p>{description}</p>
    </Card>
  );
};

// export const MenuGoalsCard = ({ title, description }: MenuGoalsCardProps) => {
//   return (
//     <List.Item.Meta
//       // avatar={<Checkbox onChange={console.log}></Checkbox>}
//       style={{lineHeight: "1.5714285714285714", whiteSpace: "normal"}}
//       title={"Title"}
//       description="Ant Design, a design language for background applications, is refined by Ant UED Team"
//     />
//   );
// };
