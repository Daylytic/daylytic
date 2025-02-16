import { CalendarOutlined, EllipsisOutlined, FlagOutlined, TagsOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, MenuProps, Select, TimePicker } from "antd";
import styles from "./routine.module.css";
import { useMemo } from "react";
import { timeFormat } from "utils/utils";
import { useDailyTasks } from "providers/daily-tasks";
import dayjs from "dayjs";
import { Priorities } from "@daylytic/shared/constants";
import { useTags } from "providers/tag";

export const OTHER_SETTINGS = ["delete", "duplicate"] as const;

export const RoutineSettings = () => {
  const priorityOptions: { label: string; value: string }[] = [];
  for (const priority of Priorities) {
    console.log("Prioprity: ", priority);
    priorityOptions.push({ label: priority, value: priority });
  }
  const menuItems: MenuProps["items"] = useMemo(() => {
    return OTHER_SETTINGS.map((type) => ({
      key: type,
      label: type,
      onClick: () => {},
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
        options={priorityOptions}
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
        <Button variant="filled" color="default" icon={<EllipsisOutlined />} />
      </Dropdown>
    </Flex>
  );
};
