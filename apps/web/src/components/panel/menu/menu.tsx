import Sider from "antd/es/layout/Sider";
import { General } from "./general";
import { Goals } from "./goals";
import styles from "./menu.module.css";
import { Header } from "./header";

export const Menu = () => (
  <Sider width={400} id={styles.sider}>
    <Header />
    <General />
    <Goals />
  </Sider>
);
