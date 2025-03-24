import { Footer as AntFooter } from "antd/es/layout/layout";
import { styles } from ".";

export const Footer = () => (
  <AntFooter id={styles.wrapper}>
    Daylytic ©{new Date().getFullYear()} Created by Łukasz "iDarkQ"
  </AntFooter>
);
