import { Card, Checkbox, List, Menu } from "antd";
import { useGoals } from "../use-goals";
import { useCookies } from "react-cookie";
import { MenuGoalsCard } from "./menu-goals-card";
import Title from "antd/es/typography/Title";
import { useMenuController } from "providers/menu-controller";

export const MenuGoals = () => {
  const { setMenu, menu } = useMenuController();

  const [cookies, _] = useCookies(["token"]);
  const { goals } = useGoals(cookies.token);

  console.log(goals);

  return (
    <>
      <Title level={4}>Goals</Title>
      <List
        itemLayout="vertical"
        dataSource={goals}
        style={{
          overflowY: "auto",
          height: "100%",
          width: "100%",
          position: "relative",
        }}
        renderItem={(item, index) => {
          const itemKey = `goalsCard-${index}`;

          return (
            <MenuGoalsCard
              selected={menu === itemKey}
              id={itemKey}
              title={item.title}
              description={item.description}
              onClick={(key) => {
                setMenu(key);
              }}
            />
          );
        }}
      />
    </>
  );
};
