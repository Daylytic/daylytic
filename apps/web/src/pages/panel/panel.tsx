import { LayoutPanel } from "components/layout/layout-panel";
import { Action } from "components/panel/action/action";
import { Content } from "components/panel/content/content";
import { Menu } from "components/panel/menu";
import { DailyTasksProvider } from "providers/daily-tasks";
import { useCookies } from "react-cookie";

export const Panel = () => {
  const [cookies] = useCookies(["token"]);
  return (
    <LayoutPanel>
      <Menu />
      <DailyTasksProvider token={cookies.token}>
        <Content />
        <Action />
      </DailyTasksProvider>
    </LayoutPanel>
  );
};
