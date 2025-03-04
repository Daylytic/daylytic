import { styles } from ".";
import { DashboardGrid } from "~/components/panel/content/dashboard/dashboard-grid";
import { DashboardUserStatistics } from "~/components/panel/content/dashboard/dashboard-user-statistics";
import { DashboardTimelyticStatistics } from "~/components/panel/content/dashboard/dashboard-timelytic-statistics";
import { DashboardGoalsStatistics } from "~/components/panel/content/dashboard/dashboard-goals-statistics";
import { useAnalytics } from "~/providers/analytics";
import { useEffect } from "react";

export const DashboardHero = () => {
  const { fetchAnalytics } = useAnalytics();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className={styles.wrapper}>
      <DashboardUserStatistics />
      <DashboardTimelyticStatistics />
      <DashboardGoalsStatistics />
      {/* Add Option To View Progress Over The Years*/}
      <DashboardGrid year={2025} />
    </div>
  );
};
