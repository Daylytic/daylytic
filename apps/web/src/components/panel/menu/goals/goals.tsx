import { List } from "antd";
import { useGoals } from "../../../../hooks/use-goals";
import { useCookies } from "react-cookie";
import { GoalsCard } from "./goals-card";
import Title from "antd/es/typography/Title";

import styles from "./goals.module.css";
import clsx from "clsx";
import { usePanel } from "../../../../hooks/use-panel";
import { useNavigate } from "react-router";

export const Goals = () => {
  const navigate = useNavigate();

  const [cookies, _] = useCookies(["token"]);
  const { goals } = useGoals(cookies.token);
  const { getContent } = usePanel();

  return (
    <>
      <Title level={4}>Goals</Title>
      <List
        itemLayout="vertical"
        dataSource={goals}
        id={styles.wrapper}
        className={clsx("css-var-r1", "ant-menu-css-var")}
        renderItem={(item, index) => (
          <GoalsCard
            selected={getContent() === item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            onClick={(key) => {
              navigate(`/panel/goals/${key}`);
            }}
          />
        )}
      />
    </>
  );
};
