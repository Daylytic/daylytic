import { Flex } from "antd";
import { styles } from ".";

interface GeneralItemProps {
  text: string;
  badge?: React.ReactNode;
}

export const GeneralItem = ({ text, badge }: GeneralItemProps) => (
  <Flex flex={1} className={styles.item}>
    <span>{text}</span>
    {badge}
  </Flex>
);