import {
  CalendarOutlined,
  EditOutlined,
  EllipsisOutlined,
  FlagOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, MenuProps } from "antd";
import styles from "./routine.module.css";
import { admonitionLabelsMap } from "@mdxeditor/editor";
import { useMemo } from "react";

export const OTHER_SETTINGS = ["delete", "duplicate"] as const;

export const RoutineSettings = () => {
  const menuItems: MenuProps["items"] = useMemo(() => {
    return OTHER_SETTINGS.map((type) => ({
      key: type,
      label: type,
      onClick: () =>{}

    }));
  }, []);

  return <Flex gap="small" id={styles.settings}>
    <Button
      type="text"
      icon={<CalendarOutlined />}
      className={styles["settings-button"]}
    >
      Deadline
    </Button>
    <Button
      type="text"
      icon={<TagsOutlined />}
      className={styles["settings-button"]}
    >
      Tags
    </Button>
    <Button
      type="text"
      icon={<FlagOutlined />}
      className={styles["settings-button"]}
    >
      Priority
    </Button>
    <Dropdown
      menu={{
        items: menuItems,
        style: { maxHeight: 300, overflowY: "auto" },
      }}
      trigger={["click"]}
      placement="bottom"
    >
      <Button type="text" icon={<EllipsisOutlined />} />
    </Dropdown>
  </Flex>
};
