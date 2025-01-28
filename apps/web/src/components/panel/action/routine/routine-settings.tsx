import {
  EditOutlined,
  EllipsisOutlined,
  FlagOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Button, Flex } from "antd";
import styles from "./routine.module.css";

export const RoutineSettings = () => (
  <Flex
    gap="small"
    id={styles.settings}
  >
    <Button type="default" icon={<EditOutlined />} className={styles["settings-button"]}>
      Text Format
    </Button>
    <Button type="default" icon={<TagsOutlined />} className={styles["settings-button"]}>
      Tags
    </Button>

    <Button type="default" icon={<FlagOutlined />} className={styles["settings-button"]}>
      Priority
    </Button>
    <Button icon={<EllipsisOutlined />} />
  </Flex>
);
