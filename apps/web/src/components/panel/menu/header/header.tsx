import {
  BookOutlined,
  CloseOutlined,
  NotificationOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Flex, Button, theme, Typography, Grid, Badge, Tooltip } from "antd";
import LogoSvg from "~/assets/svgs/logo.svg?react";
import styles from "./header.module.css";
import { General } from "~/components/panel/menu/general";
import { HeaderSettings } from "~/components/panel/menu/header/header-settings";
import { useState } from "react";
import { useLayout } from "~/providers/layout";
import { useUser } from "~/providers/user";
import { HeaderGuideForm } from "~/components/panel/menu/header/header-guide-form";

const { useBreakpoint } = Grid;
const { Title } = Typography;

export const Header = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.lg;
  const { isDarkMode } = useUser();

  const [showSettings, setShowSettings] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const { setShowMenu } = useLayout();
  const {
    token: { paddingXS },
  } = theme.useToken();

  const permission = Notification.permission;

  return (
    <Flex vertical data-tour-id="menu-header">
      <Flex id={styles.header} className="ant-typography">
        <Flex gap={paddingXS} id={styles["logo-wrapper"]}>
          <LogoSvg
            style={{
              height: "100%",
              width: "min-content",
              fill: isDarkMode() ? "#ffffff" : "#000000",
            }}
          />
          <Title level={2} id={styles["logo-text"]}>
            Daylytic
          </Title>
        </Flex>
        {permission !== "granted" ? (
          <Tooltip title="Notifications are not working. Please enable them in your browser settings.">
            <Badge dot>
              <Button
                shape="circle"
                type="text"
                onClick={() => {
                  setShowSettings(true);
                }}
                data-tour-id="menu-header-settings"
              >
                <NotificationOutlined className={styles.icon} />
              </Button>
            </Badge>
          </Tooltip>
        ) : (
          <></>
        )}
        <Button
          shape="circle"
          type="text"
          onClick={() => {
            setShowGuide(true);
          }}
          data-tour-id="menu-header-settings"
        >
          <BookOutlined className={styles.icon} />
        </Button>
        <Button
          shape="circle"
          type="text"
          onClick={() => {
            setShowSettings(true);
          }}
          data-tour-id="menu-header-settings"
        >
          <SettingOutlined className={styles.icon} />
        </Button>
        {isMobile ? (
          <Button
            shape="circle"
            type="text"
            onClick={() => {
              setShowMenu(false);
            }}
          >
            <CloseOutlined className={styles.icon} />
          </Button>
        ) : (
          <></>
        )}
        <HeaderGuideForm
          visible={showGuide}
          onClose={function (): void {
            setShowGuide(false);
          }}
        />
        <HeaderSettings
          visible={showSettings}
          onClose={function (): void {
            setShowSettings(false);
          }}
        />
      </Flex>
      <General />
    </Flex>
  );
};
