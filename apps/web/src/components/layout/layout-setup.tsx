import { Content } from "antd/es/layout/layout";
import { Hero } from "~/components/setup/hero";
import styles from "./layout.module.css";
import { PanelDataWrapper } from "~/components/layout/layout-panel";

export const LayoutSetup = () => {

  return (
    <PanelDataWrapper>
      <Content className={styles.home}>
        <Hero />
      </Content>
    </PanelDataWrapper>
  );
};
