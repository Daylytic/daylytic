import { Card, List } from "antd";
import { useGoals } from "../use-goals";
import { useCookies } from "react-cookie";
import { MenuGoalsCard } from "./menu-goals-card";
import Title from "antd/es/typography/Title";

export const MenuGoals = () => {
  const [cookies, _] = useCookies(["token"]);
  const { goals } = useGoals(cookies.token);

  return (
    <>
      <Title level={4}>Goals</Title>
      <List
        itemLayout="vertical"
        dataSource={goals}
        style={{ overflowY: "auto", height: "100%", width: "100%", position: "relative" }}
        renderItem={(item, index) => {
          return (
            <MenuGoalsCard title={item.title} description={item.description} />
          );
        }}
      />
    </>
  );
};
