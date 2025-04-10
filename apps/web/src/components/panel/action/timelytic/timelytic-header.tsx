import { Button, Flex, Tooltip, Typography } from "antd";
import { styles, useHeader } from ".";
import { CloseOutlined } from "@ant-design/icons";

export const TimelyticHeader = () => {
  const { isMobile, handleExitClick } = useHeader();

  return (
    <Flex className="ant-typography" justify="space-between" align="center">
      <Typography.Title level={2} className={styles.title}>
        Overview
      </Typography.Title>{" "}
      {isMobile && (
        <Tooltip title="Close">
          <Button onClick={handleExitClick} icon={<CloseOutlined />} type="text" />
        </Tooltip>
      )}
    </Flex>
  );
};
