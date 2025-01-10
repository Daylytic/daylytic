import { Card, Checkbox, List, Menu } from "antd";
import { useGoals } from "../use-goals";
import { useCookies } from "react-cookie";
import { MenuGoalsCard } from "./menu-goals-card";
import Title from "antd/es/typography/Title";
import { MenuGeneralItem } from "./menu-general-item";

export const MenuGoals = ({ selectedMenu, setSelectedMenu }) => {
  const [cookies, _] = useCookies(["token"]);
  const { goals } = useGoals(cookies.token);

  console.log(goals);

  return (
    <>
      <Title level={4}>Goals</Title>
      <List
        itemLayout="vertical"
        dataSource={goals}
        style={{ overflowY: "auto", height: "100%", width: "100%", position: "relative" }}
        renderItem={(item, index) => {
          const itemKey = `goalsCard-${index}`;

          return (
            <MenuGoalsCard selected={selectedMenu === itemKey} id={itemKey} title={item.title} description={item.description} onClick={(key) => {setSelectedMenu(key)}}/>
          );
        }}
      />
    </>
  );
};
