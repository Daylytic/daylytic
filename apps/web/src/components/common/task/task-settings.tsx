import {
  CalendarOutlined,
  ClockCircleOutlined,
  EllipsisOutlined,
  FlagOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Divider, Dropdown, Flex, Popover, Select, TimePicker } from "antd";
import { styles } from ".";
import { dateWithTimeFormat, timeFormat } from "~/utils/date";
import dayjs from "dayjs";
import { TaskSettingsSkeleton, useSettings } from ".";
import clsx from "clsx";
import { TagManager } from "~/components/common/tag";
import { Task } from "~/types/task";

interface TaskSettingsProps {
  selectedTask: Task | undefined;
  onChange: (task: Task) => Promise<void>;
  onConfirmDeletetion: ((e?: React.MouseEvent<HTMLElement>) => void) | undefined;
}

export const TaskSettings = ({
  selectedTask,
  onChange,
  onConfirmDeletetion,
}: TaskSettingsProps) => {
  if (selectedTask === undefined) {
    return <TaskSettingsSkeleton />;
  }

  const { tagOptions, selectedTagOptions, priorityOptions, menuItems } = useSettings({
    selectedTask,
    onChange,
    onConfirmDeletetion,
  });

  const timelinePicker =
    selectedTask.taskType === "ROUTINE" ? (
      <TimePicker
        format={timeFormat}
        variant="filled"
        prefix={<ClockCircleOutlined />}
        suffixIcon={<></>}
        className={styles["settings-button"]}
        placeholder="Time"
        defaultValue={dayjs(selectedTask.deadline).isValid() ? dayjs(selectedTask.deadline) : null}
        onChange={(e) => {
          selectedTask.deadline = e.toISOString();
          onChange(selectedTask);
        }}
      />
    ) : (
      <DatePicker
        format={dateWithTimeFormat}
        variant="filled"
        prefix={<CalendarOutlined />}
        showTime={{
          format: timeFormat,
          hideDisabledOptions: true,
          showNow: false
        }}
        suffixIcon={<></>}
        className={styles["settings-button"]}
        placeholder="Date"
        defaultValue={dayjs(selectedTask.deadline).isValid() ? dayjs(selectedTask.deadline) : null}
        onChange={(e) => {
          selectedTask.deadline = e.toISOString();
          onChange(selectedTask);
        }}
        getPopupContainer={(trigger) => trigger.parentElement || document.body}
      />
    );

  return (
    <Flex gap="small" id={styles.settings}>
      {timelinePicker}
      <Popover
        placement="bottom"
        content={
          <Flex vertical className={styles["tag-popover"]} gap="small">
            <Flex wrap gap="small">
              {selectedTagOptions}
            </Flex>
            {selectedTagOptions.length > 0 && tagOptions.length > 0 ? (
              <Divider className={styles["tags-divider"]} />
            ) : (
              <></>
            )}
            <Flex wrap gap="small">
              {tagOptions}
            </Flex>
            <Flex gap="small">
              <TagManager />
            </Flex>
          </Flex>
        }
        trigger="click"
      >
        <Button
          icon={<TagsOutlined />}
          color="default"
          variant="filled"
          className={clsx(styles["settings-button"], styles["tags-button"])}
        >
          Tags
        </Button>
      </Popover>
      <Select
        allowClear
        prefix={<FlagOutlined />}
        suffixIcon={<></>}
        variant="filled"
        className={styles["settings-button"]}
        options={priorityOptions}
        placeholder="Priority"
        defaultValue={selectedTask.priority}
        onChange={(e) => {
          selectedTask.priority = e;
          onChange(selectedTask);
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