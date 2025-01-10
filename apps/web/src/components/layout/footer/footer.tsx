import { Footer as AntFooter} from "antd/es/layout/layout";
import styles from "./footer.module.css";

export const Footer = () => (
  <AntFooter id={styles.wrapper}>
    Daylytic ©{new Date().getFullYear()} Created by Łukasz "iDarkQ"
  </AntFooter>
);
