import { Layout as AntLayout } from "antd";
import { LayoutProps } from "./layout";

import styles from "./layout.module.css";

export const LayoutPanel = ({ children }: LayoutProps) => (
  <AntLayout id={styles.panel}>
    {children}
  </AntLayout>
);
