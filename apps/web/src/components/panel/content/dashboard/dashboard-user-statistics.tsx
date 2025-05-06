import {
  RobotOutlined,
  FireOutlined,
  CalendarOutlined,
  OrderedListOutlined,
  UpCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Flex, Button, Card, Statistic, Tooltip } from "antd";
import clsx from "clsx";
import { styles, useUserStatistics } from ".";
import { statisticsCountUp } from "~/utils/data";

export const DashboardUserStatistics = () => {
  const { openDailyAssistant, result, analytics } = useUserStatistics();

  return (
    <Flex gap="small" className={styles.row}>
      <Button
        onClick={openDailyAssistant}
        color="primary"
        variant="filled"
        className={clsx(styles.ai, styles.available)}
      >
        <RobotOutlined />
        Daily Assistant
      </Button>
      <Tooltip title="Your productivity index is calculated based on your routine consistency, task completion, project completion, and more.">
        <Card className={styles.card}>
          <Statistic
            title={
              <>
                You are - {result.level} <InfoCircleOutlined />
              </>
            }
            value={result.index}
            prefix={
              <>
                <UpCircleOutlined /> Index of
              </>
            }
            formatter={statisticsCountUp}
          />
        </Card>
      </Tooltip>
      <Card className={styles.card}>
        <Statistic
          title="Login Streak"
          value={analytics?.loginStreak ?? 0}
          prefix={<FireOutlined />}
          suffix="Days"
          formatter={statisticsCountUp}
        />
      </Card>
      <Card className={styles.card}>
        <Statistic
          title="Record Login Streak"
          value={analytics?.recordLoginStreak ?? 0}
          prefix={<CalendarOutlined />}
          formatter={statisticsCountUp}
          suffix="Days"
        />
      </Card>
      <Tooltip title="Your routine streak only updates by the end of the day.">
        <Card className={styles.card}>
          <Statistic
            title={
              <>
                Routine Streak <InfoCircleOutlined />
              </>
            }
            value={analytics?.routineStreak ?? 0}
            prefix={<OrderedListOutlined />}
            formatter={statisticsCountUp}
            suffix="Days"
          />
        </Card>
      </Tooltip>
      <Card className={styles.card}>
        <Statistic
          title="Record Routine Streak"
          value={analytics?.recordRoutineStreak ?? 0}
          prefix={<OrderedListOutlined />}
          formatter={statisticsCountUp}
          suffix="Days"
        />
      </Card>
    </Flex>
  );
};
