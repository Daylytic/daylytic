import { CalendarOutlined, EllipsisOutlined, FlagOutlined, TagsOutlined } from "@ant-design/icons";
import { Button, Divider, Dropdown, Flex, Popover, Select, TimePicker } from "antd";
import styles from "./routine.module.css";
import { timeFormat } from "utils/utils";
import { useDailyTasks } from "providers/daily-tasks";
import dayjs from "dayjs";
import { RoutineSettingsSkeleton, useSettings } from ".";
import clsx from "clsx";
import { TagCreator } from "components/common/tag";

export const RoutineSettings = () => {
  const { selectedTask, updateTask, deleteTask } = useDailyTasks();
  if (selectedTask!.current === undefined) {
    return <RoutineSettingsSkeleton />;
  }

  const { tagOptions, selectedTagOptions, priorityOptions, menuItems } = useSettings({
    selectedTask,
    updateTask,
    deleteTask,
  });

  return (
    <Flex gap="small" id={styles.settings}>
      <TimePicker
        format={timeFormat}
        variant="filled"
        prefix={<CalendarOutlined />}
        suffixIcon={<></>}
        className={styles["button"]}
        placeholder="Time"
        defaultValue={
          dayjs(selectedTask!.current!.deadline).isValid()
            ? dayjs(selectedTask!.current!.deadline)
            : null
        }
        onChange={(e) => {
          selectedTask!.current!.deadline = e.toISOString();
          updateTask(selectedTask!.current!);
        }}
      ></TimePicker>
      <Popover
        placement="bottom"
        content={
          <Flex vertical className={styles["tag-popover"]} gap={"small"}>
            <Flex wrap gap={"small"}>
              {selectedTagOptions}
            </Flex>
            {selectedTagOptions.length > 0 && tagOptions.length > 0 ? (
              <Divider className={styles["tags-divider"]} /> //TODO: Check if orientional margin is just normal margin
            ) : (
              <></>
            )}
            <Flex wrap gap={"small"}>
              {tagOptions}
            </Flex>
            <Flex gap={"small"}>
              <TagCreator />
            </Flex>
          </Flex>
        }
        trigger="click"
      >
        <Button
          icon={<TagsOutlined />}
          color="default"
          variant="filled"
          className={clsx(styles["button"], styles["tag-button"])}
        >
          Tags
        </Button>
      </Popover>
      <Select
        allowClear
        prefix={<FlagOutlined />}
        suffixIcon={<></>}
        variant="filled"
        className={styles["button"]}
        options={priorityOptions}
        placeholder="Priority"
        defaultValue={selectedTask!.current!.priority}
        onChange={(e) => {
          selectedTask!.current!.priority = e;
          updateTask(selectedTask!.current!);
        }}
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
