import {
  CalendarOutlined,
  EllipsisOutlined,
  FlagOutlined,
  PlusOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Input, MenuProps, Popover, Select, Tag, TimePicker } from "antd";
import styles from "./routine.module.css";
import { useMemo, useState } from "react";
import { timeFormat } from "utils/utils";
import { useDailyTasks } from "providers/daily-tasks";
import dayjs from "dayjs";
import { Priorities } from "@daylytic/shared/constants";
import { useTags } from "providers/tag";

export const OTHER_SETTINGS = ["delete", "duplicate"] as const;

export const RoutineSettings = () => {
  const { selectedTask, updateTask } = useDailyTasks();
  const { tags } = useTags();
  const [inputVisible, setInputVisible] = useState<Boolean>(false);

  console.log(tags);

  const priorityOptions: { label: string; value: string }[] = [];
  const tagOptions: React.JSX.Element[] = [];
  const selectedTagsOptions: { label: string; value: string }[] = [];
  for (const priority of Priorities) {
    console.log("Prioprity: ", priority);
    priorityOptions.push({ label: priority, value: priority });
  }

  for (const tag of tags) {
    const containsTask = tag.taskIds.includes(selectedTask!.id);
    tagOptions.push(
      // <Tag.CheckableTag style={{ color: "black" }} color={tag.color}>
      //   {tag.name}
      // </Tag.CheckableTag>,
      <Tag
        onClose={(event) => {
          if (!containsTask) {
            event.preventDefault();
            //TODO: Add tag to the task
          }
        }}
        closeIcon={containsTask ? null : <PlusOutlined />}
        bordered={true}
        style={{ color: "black" }}
        closable
        color={tag.color}
      >
        {tag.name}
      </Tag>,
    );

    console.log("CONTAINSD, " + selectedTask!.id);
  }

  // const sharedProps: SelectProps = {
  //   mode: "multiple",
  //   style: { width: "100%" },
  //   maxTagCount: "responsive",
  // };

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
        defaultValue={
          dayjs(selectedTask!.deadline).isValid() ? dayjs(selectedTask!.deadline) : null
        }
        onChange={(e) => {
          selectedTask!.deadline = e.toISOString();
          updateTask(selectedTask!);
        }}
      ></TimePicker>
      {/* <Select
        allowClear
        prefix={<TagsOutlined />}
        suffixIcon={<></>}
        variant="filled"
        className={styles["button"]}
        defaultValue={selectedTagsOptions}
        options={tagOptions}
        placeholder="Tags"
        {...sharedProps}
      /> */}
      <Popover
        placement="bottom"
        content={
          <>
            {tagOptions}
            {inputVisible ? (
              <Input
                // ref={inputRef}
                type="text"
                size="small"
                // style={tagInputStyle}
                // value={inputValue}
                // onChange={handleInputChange}
                // onBlur={handleInputConfirm}
                // onPressEnter={handleInputConfirm}
              />
            ) : (
              <Tag icon={<PlusOutlined />} color={"default"}>
                New Tag
              </Tag>
            )}
          </>
        }
        title="Select Tags"
        trigger="click"
      >
        <Button
          style={{ display: "flex", justifyContent: "flex-start" }}
          icon={<TagsOutlined />}
          color="default"
          variant="filled"
          className={styles["button"]}
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
        defaultValue={selectedTask!.priority}
        onChange={(e) => {
          selectedTask!.priority = e;
          updateTask(selectedTask!);
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
