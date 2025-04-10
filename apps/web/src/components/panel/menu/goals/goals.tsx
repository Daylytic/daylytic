import { Flex, List, Typography } from "antd";
import clsx from "clsx";
import { styles, useGoals, GoalCreatorCard } from ".";
import { useGoal } from "~/providers/goal";
import { GoalsCardsSkeleton } from "./skeleton";

export const Goals = () => {
  const { goals, fetched } = useGoal();
  const { handleRenderItem } = useGoals();

  return (
    <Flex vertical className={styles["menu-wrapper"]} data-tour-id="menu-goals">
      <Typography.Title level={4}>Goals</Typography.Title>
      {!fetched ? (
        <GoalsCardsSkeleton />
      ) : (
        <List
          itemLayout="vertical"
          header={<GoalCreatorCard />}
          dataSource={goals}
          id={styles.wrapper}
          className={clsx("css-var-r1", "ant-menu-css-var")}
          renderItem={handleRenderItem}
        />
      )}
    </Flex>
  );
};
