import { Card } from "antd";

interface MenuGoalsCardProps {
  title: string;
  description: string;
}

//Learn how to code in C++
//Dedicate myself towards learning this language so that by the end of the year I can make simple apps
export const MenuGoalsCard = ({ title, description }: MenuGoalsCardProps) => {
  return (
    <Card
      hoverable
      title={title}
      extra={<a href="#">More</a>}
      style={{ width: "100%" }}
    >
      <p>{description}</p>
    </Card>
  );
};
