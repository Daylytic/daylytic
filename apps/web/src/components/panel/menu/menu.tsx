import { Grid } from "antd";
import { MenuDrawer, MenuSider } from ".";

const { useBreakpoint } = Grid;

export const Menu = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.xl;

  return isMobile ? <MenuDrawer /> : <MenuSider />;
};
