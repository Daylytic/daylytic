import { Flex } from "antd";
import styles from "./goals.module.css";

interface MenuGeneralItemProps {
  text: string;
  badge?: React.ReactNode;
}

export const GeneralItem = ({ text, badge }: MenuGeneralItemProps) => (
  <Flex
    flex={1}
    className={styles.item}
  >
    <span>{text}</span>
    {badge}
  </Flex>
);
