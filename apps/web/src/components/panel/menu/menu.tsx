import Sider from "antd/es/layout/Sider";
import { MenuGeneral } from "./menu-general";
import { MenuGoals } from "./menu-goals";
import styles from "./menu.module.css";
import { MenuHeader } from "./menu-header";

export const Menu = () => (
  <Sider width={400} id={styles.sider}>
    <MenuHeader />
    <MenuGeneral />
    <MenuGoals />
  </Sider>
);
