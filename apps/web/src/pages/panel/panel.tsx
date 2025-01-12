import { LayoutPanel } from "components/layout/layout-panel";
import { Action } from "components/panel/action/action";
import { Content } from "components/panel/content/content";
import { Menu } from "components/panel/menu";
import { MenuControllerProvider } from "providers/menu-controller";

export const Panel = () => (
    <LayoutPanel>
      <Menu />
      <Content />
      <Action />
    </LayoutPanel>
);
