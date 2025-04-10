import { CarryOutOutlined, HourglassOutlined, PieChartOutlined } from "@ant-design/icons";
import { Flex, Card, Statistic } from "antd";
import { styles } from ".";
import { useAnalytics } from "~/providers/analytics";
import { statisticsCountUp } from "~/utils/data";
import { getFormattedTimeSpent } from "~/utils/date";

export const DashboardTimelyticStatistics = () => {
  const { analytics } = useAnalytics();
  const timeSpent = analytics?.timelyticTimeSpent ?? 0;
  const { value, suffix } = getFormattedTimeSpent(timeSpent);

  return (
    <Flex gap="small" className={styles.row}>
      <Card title="Timelytic" className={styles.card}>
        <Flex gap="small" className={styles.row}>
          <Card type="inner" className={styles.card}>
            <Statistic
              title="Sessions"
              value={analytics?.timelyticSessions ?? 0}
              prefix={<PieChartOutlined />}
              formatter={statisticsCountUp}
            />
          </Card>
          <Card type="inner" className={styles.card}>
            <Statistic
              title="Tasks Finished"
              value={analytics?.timelyticTasksFinished ?? 0}
              prefix={<CarryOutOutlined />}
              formatter={statisticsCountUp}
            />
          </Card>
          <Card type="inner" className={styles.card}>
            <Statistic
              title="Time Spent"
              value={value}
              prefix={<HourglassOutlined />}
              suffix={suffix}
              formatter={statisticsCountUp}
            />
          </Card>
        </Flex>
      </Card>
    </Flex>
  );
};
