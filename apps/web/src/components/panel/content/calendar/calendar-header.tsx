import { Flex } from "antd";
import { ContentTitle } from "../";

export const CalendarHeader = () => (
  <Flex align="center" gap="small" className="ant-typography">
    <Flex justify="center" align="center" gap="small" wrap={true}>
      <ContentTitle title="Calendar" />
    </Flex>
  </Flex>
);
