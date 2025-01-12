import { SettingOutlined } from "@ant-design/icons";
import { Flex, Button, theme, Typography } from "antd";
import logo from "assets/svgs/logo.svg";
import styles from "./menu.module.css";
import clsx from "clsx";

const { Title } = Typography;

export const MenuHeader = () => {
  const {
    token: { fontSizeHeading4, paddingXS },
  } = theme.useToken();

  return (
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
  );
};
