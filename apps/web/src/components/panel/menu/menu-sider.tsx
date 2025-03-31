import Sider from "antd/es/layout/Sider";
import { Flex } from "antd";
import { Goals, Header, Tags } from ".";
import styles from "./menu.module.css";

export const MenuSider = () => (
  <Sider width={400} className={styles.sider} data-tour-id="menu">
    <Flex vertical gap="large" className={styles["sider-content-wrapper"]}>
      <Header />
      <Tags />
      <Goals />
    </Flex>
  </Sider>
);
