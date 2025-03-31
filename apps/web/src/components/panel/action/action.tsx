import { ActionDrawer, ActionSider } from ".";
import { Grid } from "antd";
import { ReactNode } from "react";

const { useBreakpoint } = Grid;

export interface ActionProps {
  children: ReactNode;
}

export const Action = ({ children }: ActionProps) => {
  const screens = useBreakpoint();
  const isMobile = !screens.lg;

  return isMobile ? <ActionDrawer>{children}</ActionDrawer> : <ActionSider>{children}</ActionSider>;
};
