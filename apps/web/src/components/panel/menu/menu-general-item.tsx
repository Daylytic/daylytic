import { ClockCircleOutlined } from "@ant-design/icons";
import { Flex, Badge } from "antd";

interface MenuGeneralItemProps {
    text: string,
    badge?: React.ReactNode,
}

export const MenuGeneralItem = ({text, badge}: MenuGeneralItemProps) => {
  return (
    <Flex
      flex={1}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span>{text}</span>
      {badge}
    </Flex>
  );
};
