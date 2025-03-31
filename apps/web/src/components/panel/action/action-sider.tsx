import { Flex } from "antd";
import Sider from "antd/es/layout/Sider";
import { ActionProps, styles } from ".";

export const ActionSider = ({ children }: ActionProps) => (
  <Sider width={500} className={styles.sider}>
    <Flex vertical className={styles["wrapper"]}>
      {children}
    </Flex>
  </Sider>
);
