import { SettingOutlined } from "@ant-design/icons";
import { Flex, Button, theme, Typography } from "antd";
import logo from "assets/svgs/logo.svg";
import styles from "./header.module.css";
import clsx from "clsx";
import { General } from "components/panel/menu/general";

const { Title } = Typography;

export const Header = () => {
  const {
    token: { paddingXS },
  } = theme.useToken();

  return (
    <Flex vertical>
      <Flex id={styles.header} className={clsx("ant-typography")}>
        <Flex gap={paddingXS} id={styles["logo-wrapper"]}>
          <img src={logo} />
          <Title level={2} id={styles["logo-text"]}>
            Daylytic
          </Title>
        </Flex>
        <Button shape="circle" type="text">
          <SettingOutlined id={styles["setting-icon"]} />
        </Button>
      </Flex>
      <General />
    </Flex>
  );
};
