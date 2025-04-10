import { Flex } from "antd";
import { ContentTitle } from "../";

export const TimelyticHeader = () => (
  <Flex align="center" gap="small" className="ant-typography">
    <Flex justify="center" align="center" gap="small" wrap={true}>
      <ContentTitle title="Timelytic" />
    </Flex>
  </Flex>
);