import { Button, Divider, Flex, List, Tooltip } from "antd";
import { styles, useDashboard } from ".";
import { DashboardHeader } from "~/components/panel/action/dashboard";
import { DashboardCard } from "~/components/panel/action/dashboard/dashboard-card";
import clsx from "clsx";
import { DashboardForm } from "~/components/panel/action/dashboard/dashboard-form";
import dayjs from "dayjs";
import { dateFormat } from "~/utils/date";
import { getAssistanceRoute } from "~/utils/routes";
import { DashboardAssistance } from "~/components/panel/action/dashboard/dashboard-assistance";
import { Action } from "~/components/panel/action";

export const Dashboard = () => {
  const { navigate, assistance, sortedAssistances, visibleCount, handleSubmit, loadMore } =
    useDashboard();

  return (
    <Action>
      <DashboardHeader />
      {assistance ? (
        <DashboardAssistance assistance={assistance} />
      ) : (
        <Flex gap="small" vertical className={styles.assistances}>
          <List
            itemLayout="vertical"
            dataSource={sortedAssistances.slice(0, visibleCount)}
            header={<DashboardForm onSubmit={handleSubmit} onCancel={() => {}} />}
            className={clsx(styles.list, "css-var-r1", "ant-menu-css-var")}
            renderItem={(data, index) => {
              return (
                <DashboardCard
                  title={"Assistance on " + dayjs(data.createdAt).format(dateFormat)}
                  description={Object.keys(data.questions).map((question, index) => (
                    <Tooltip title={`${index + 1}. ${question}`} key={index}>
                      {data.questions[question]}
                      <Divider type="vertical" />
                    </Tooltip>
                  ))}
                  id={index}
                  onClick={() => {
                    navigate(getAssistanceRoute(data.id));
                  }}
                />
              );
            }}
          />
          {visibleCount < sortedAssistances.length && (
            <Flex justify="center">
              <Button onClick={loadMore}>Load More</Button>
            </Flex>
          )}
        </Flex>
      )}
    </Action>
  );
};
