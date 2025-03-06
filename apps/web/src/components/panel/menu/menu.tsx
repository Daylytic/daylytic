import Sider from "antd/es/layout/Sider";
import { Goals } from "./goals";
import styles from "./menu.module.css";
import { Header } from "./header";
import { Tags } from "./tags";
import { Flex } from "antd";

export const Menu = () => (
  <Sider width={400} id={styles.sider}>
    <Flex vertical gap={"large"}>
      <Header />
      <Tags />
      <Goals />
    </Flex>
  </Sider>
);
