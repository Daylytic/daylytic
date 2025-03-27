import { PieChartOutlined, CarryOutOutlined, HourglassOutlined } from "@ant-design/icons";
import { Flex, Card, Statistic } from "antd";
import { styles } from ".";
import { useAnalytics } from "~/providers/analytics";
import { getFormattedTimeSpent } from "~/utils/date";

export const TimelyticStatistics = () => {
  const { analytics } = useAnalytics();
  const timeSpent = analytics?.timelyticTimeSpent ?? 0;
  const { value, suffix } = getFormattedTimeSpent(timeSpent);

  return (
    <Flex gap="small" className={styles.row}>
      <Card type="inner" className={styles.card}>
        <Statistic
          title="Sessions"
          value={analytics?.timelyticSessions ?? 0}
          prefix={<PieChartOutlined />}
        />
      </Card>
      <Card type="inner" className={styles.card}>
        <Statistic
          title="Tasks Finished"
          value={analytics?.timelyticTasksFinished ?? 0}
          prefix={<CarryOutOutlined />}
        />
      </Card>
      <Card type="inner" className={styles.card}>
        <Statistic
          title="Time Spent"
          value={value}
          prefix={<HourglassOutlined />}
          suffix={suffix}
        />
      </Card>
    </Flex>
  );
};
