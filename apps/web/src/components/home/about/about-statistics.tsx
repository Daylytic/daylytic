import { AimOutlined, CarryOutOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Flex, Card, Statistic } from "antd";
import { styles } from ".";
import { statisticsCountUp } from "~/utils/data";
import { useStatistics } from "~/providers/statistics";

export const AboutStatistics = () => {
  const {statistics} = useStatistics();
  return (
    <Card title="Our Statistics" className={styles.card}>
      <Flex gap="small" className={styles.row}>
        <Card type="inner" className={styles.statistic}>
          <Statistic
            title="Reached Goals"
            value={statistics?.reachedGoals ?? 0}
            prefix={<AimOutlined />}
            formatter={statisticsCountUp}
          />
        </Card>
        <Card type="inner" className={styles.statistic}>
          <Statistic
            title="Completed Projects"
            value={statistics?.completedProjects ?? 0}
            prefix={<CarryOutOutlined />}
            formatter={statisticsCountUp}
          />
        </Card>
        <Card type="inner" className={styles.statistic}>
          <Statistic
            title="Completed Tasks"
            value={statistics?.completedTasks ?? 0}
            prefix={<OrderedListOutlined />}
            formatter={statisticsCountUp}
          />
        </Card>
      </Flex>
    </Card>
  );
};
