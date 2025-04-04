import { Button, Dropdown, Flex, Grid, Progress, Skeleton } from "antd";
import Countdown from "antd/es/statistic/Countdown";
import { styles, useClock } from ".";
import dayjs from "dayjs";
import { clockFormat } from "~/utils/date";
import clsx from "clsx";

const { useBreakpoint } = Grid;

export const TimelyticClock = () => {
  const {
    timelytic,
    dropDownItems,
    resetTimer,
    percent,
    deadline,
    isRunning,
    remainingTime,
    continueTimer,
    stopTimer,
    endTimer,
    handleOpenOverview,
  } = useClock();

  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  if (!timelytic) {
    return (
      <Flex vertical gap="large" className={styles.wrapper}>
        <Flex className={styles["progress-wrapper"]}>
          <Skeleton.Avatar active size={350} shape="circle" />
        </Flex>
        <Flex vertical justify="center" className={styles.buttons} align="top" gap="small">
          <Skeleton.Button active style={{ width: isMobile ? 120 : 160 }} />
          <Skeleton.Button active style={{ width: isMobile ? 120 : 160 }} />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex vertical gap="large" className={styles.wrapper}>
      <Flex className={styles["progress-wrapper"]}>
        <Progress
          type="circle"
          className={clsx(styles.progress, percent == 100 && styles.finished)}
          percent={percent}
          strokeWidth={2}
          format={() =>
            isRunning && percent != 100 && deadline ? (
              <Countdown value={deadline.valueOf()} format={clockFormat} />
            ) : (
              <span className="ant-statistic-content-value">
                {dayjs(Math.max(remainingTime, 0)).format(clockFormat)}
              </span>
            )
          }
        />
      </Flex>
      <Flex vertical justify="center" className={styles.buttons} align="top" gap="small">
        {isRunning && deadline && percent != 100 ? (
          <Button size="large" onClick={stopTimer}>
            Stop
          </Button>
        ) : (
          <Flex vertical gap="small">
            {deadline && percent != 100 ? (
              <>
                <Button size="large" onClick={continueTimer}>
                  Continue
                </Button>
                <Button type="primary" size="large" onClick={endTimer}>
                  End
                </Button>
              </>
            ) : (
              <Dropdown.Button
                trigger={["click"]}
                menu={{ onClick: resetTimer, items: dropDownItems }}
                size="large"
                type="primary"
                onClick={resetTimer}
              >
                {dropDownItems[0]!.label!}
              </Dropdown.Button>
            )}
          </Flex>
        )}
        {isMobile && (
          <Button size="large" onClick={handleOpenOverview}>
            Overview
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
