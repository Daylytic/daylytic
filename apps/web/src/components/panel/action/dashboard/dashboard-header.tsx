import { Button, Flex, Tooltip, Typography } from "antd";
import { styles, useHeader } from ".";
import { CloseOutlined, LeftOutlined } from "@ant-design/icons";

export const DashboardHeader = () => {
  const { handleExitClick, assistanceId } = useHeader();

  return (
    <Flex className="ant-typography" justify="space-between" align="center">
      <Typography.Title level={2} className={styles.title}>
        Daily Assistant
      </Typography.Title>
      <Tooltip title={assistanceId ? "Go Back" : "Close"}>
        <Button
          onClick={handleExitClick}
          icon={assistanceId ? <LeftOutlined /> : <CloseOutlined />}
          type="text"
        />
      </Tooltip>
    </Flex>
  );
};
