import { Flex, List, Typography } from "antd";
import clsx from "clsx";
import { styles } from "components/layout";
import { GoalCreatorCard } from "components/panel/menu/goals/goal-creator-card";
import { GoalsCard } from "components/panel/menu/goals/goals-card";
import { usePanel } from "hooks/use-panel";
import { useGoal } from "providers/goal";
import { useNavigate } from "react-router";

export const Goals = () => {
  const navigate = useNavigate();

  const { goals, selectedGoal } = useGoal();
  const { getContent } = usePanel();

  return (
    <Flex vertical>
      <Typography.Title level={4}>Goals</Typography.Title>
      <GoalCreatorCard />
      <List
        itemLayout="vertical"
        dataSource={goals}
        id={styles.wrapper}
        className={clsx("css-var-r1", "ant-menu-css-var")}
        renderItem={(item, _) => (
          <>
            <GoalsCard
              selected={getContent() === item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              onClick={(key) => {
                selectedGoal.current = item;
                navigate(`/panel/goal/${key}`);
              }}
            />
          </>
        )}
      />
    </Flex>
  );
};
