import { Button, Flex, Tooltip, Typography } from "antd";

import { styles, useHeader } from ".";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { CloseOutlined } from "@ant-design/icons";

dayjs.extend(timezone);

export interface CalendarHeaderProps {
  calendar: string;
}

export const CalendarHeader = ({ calendar }: CalendarHeaderProps) => {
  const { formattedDate, handleClose } = useHeader({ calendar });

  return (
    <Flex className="ant-typography" justify="space-between" align="center">
      <Typography.Title level={2} className={styles.title}>
        {formattedDate}
      </Typography.Title>
      <Tooltip title="Close">
        <Button onClick={handleClose} icon={<CloseOutlined />} type="text" />
      </Tooltip>
    </Flex>
  );
};
