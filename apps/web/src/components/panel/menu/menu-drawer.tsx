import { Drawer, Flex } from "antd";
import { useLayout } from "~/providers/layout";
import { useTour } from "~/providers/tour";
import { Goals, Header, Tags } from ".";
import styles from "./menu.module.css";

export const MenuDrawer = () => {
  const { showMenu, setShowMenu } = useLayout();
  const { isTourActive } = useTour();

  return (
    <Drawer
      className={styles.drawer}
      size="default"
      placement="left"
      open={showMenu || isTourActive}
      closable={false}
      onClose={() => setShowMenu(!showMenu)}
      data-tour-id="menu"
      motion={{
        motionAppear: false,
      }}
    >
      <Flex vertical gap="large" className={styles["drawer-content-wrapper"]}>
        <Header />
        <Tags />
        <Goals />
      </Flex>
    </Drawer>
  );
};
