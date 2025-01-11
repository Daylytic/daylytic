import { LayoutPanel } from "components/layout/layout-panel";
import { ContentRoutine } from "components/panel/content/content-routine";
import { Menu } from "components/panel/menu";

export const Panel = () => (
  <LayoutPanel>
    <Menu />
    <ContentRoutine />
    {/* <Sider style={{}} width={500}></Sider> */}
  </LayoutPanel>
);
