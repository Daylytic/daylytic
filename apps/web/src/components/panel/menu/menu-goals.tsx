import { List } from "antd";
import { useGoals } from "../use-goals";
import { useCookies } from "react-cookie";
import { MenuGoalsCard } from "./menu-goals-card";
import Title from "antd/es/typography/Title";
import { useMenuController } from "providers/menu-controller";

import styles from "./menu.module.css";
import clsx from "clsx";
import { usePanel } from "../use-panel";
import { useNavigate } from "react-router";

export const MenuGoals = () => {
  const navigate = useNavigate();
  const {menu, setMenu} = useMenuController();

  const [cookies, _] = useCookies(["token"]);
  const { goals } = useGoals(cookies.token);

  return (
    <>
      <Title level={4}>Goals</Title>
      <List
        itemLayout="vertical"
        dataSource={goals}
        id={styles.goals}
        className={clsx("css-var-r1", "ant-menu-css-var")}
        renderItem={(item, index) => {
          return (
            <MenuGoalsCard
              selected={menu === item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              onClick={(key) => {
                setMenu(key);
                navigate(`/panel/goals/${key}`)
              }}
            />
          );
        }}
      />
    </>
  );
};
