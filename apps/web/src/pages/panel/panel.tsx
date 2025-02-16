import { LayoutPanel } from "components/layout/layout-panel";
import { Action } from "components/panel/action/action";
import { Content } from "components/panel/content/content";
import { Menu } from "components/panel/menu";
import { DailyTasksProvider } from "providers/daily-tasks";
import { TagProvider } from "providers/tag";
import { useCookies } from "react-cookie";

export const Panel = () => {
  const [cookies] = useCookies(["token"]);
  return (
    <DailyTasksProvider token={cookies.token}>
      <TagProvider token={cookies.token}>
        <LayoutPanel>
          <Menu />
          <Content />
          <Action />
        </LayoutPanel>
      </TagProvider>
    </DailyTasksProvider>
  );
};
