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

  return (
    <Flex gap="small" id={styles.settings}>
      <TimePicker
        format={timeFormat}
        variant="filled"
        prefix={<CalendarOutlined />}
        suffixIcon={<></>}
        className={styles["button"]}
        placeholder="Time"
      ></TimePicker>
      <Select
        allowClear
        prefix={<TagsOutlined />}
        suffixIcon={<></>}
        variant="filled"
        className={styles["button"]}
        options={[{ value: "lucy", label: "Lucy" }]}
        placeholder="Tags"
      />
      <Select
        allowClear
        prefix={<FlagOutlined />}
        suffixIcon={<></>}
        variant="filled"
        className={styles["button"]}
        options={[{ value: "lucy", label: "Lucy" }]}
        placeholder="Priority"
      />

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
