import { AimOutlined, UnorderedListOutlined, CarryOutOutlined } from "@ant-design/icons";
import { Flex, Card, Statistic } from "antd";
import { styles,useGoalStatistics } from ".";
import { statisticsCountUp } from "~/utils/data";

export const DashboardGoalsStatistics = () => {
  const {finishedGoals, finishedProjects, completedTasks} = useGoalStatistics();

  return (
    <Flex gap="small" className={styles.row}>
      <Card title="Goals" className={styles.card}>
        <Flex gap="small" className={styles.row}>
          <Card className={styles.card}>
            <Statistic
              title="Reached Goals"
              value={finishedGoals.length}
              prefix={<AimOutlined />}
              formatter={statisticsCountUp}
            />
          </Card>
          <Card className={styles.card}>
            <Statistic
              title="Finished Projects"
              value={finishedProjects.length}
              prefix={<UnorderedListOutlined />}
              formatter={statisticsCountUp}
            />
          </Card>
          <Card className={styles.card}>
            <Statistic
              title="Finished Tasks"
              value={completedTasks.length}
              prefix={<CarryOutOutlined />}
              formatter={statisticsCountUp}
            />
          </Card>
        </Flex>
      </Card>
    </Flex>
  );
};
