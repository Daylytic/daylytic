import {
  CalendarOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
  FlagOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  ColorPicker,
  ColorPickerProps,
  Divider,
  Dropdown,
  Flex,
  Input,
  InputRef,
  MenuProps,
  Popconfirm,
  Popover,
  Row,
  Select,
  Skeleton,
  Space,
  Tag,
  theme,
  TimePicker,
  Tooltip,
} from "antd";
import styles from "./routine.module.css";
import { useRef, useState } from "react";
import { timeFormat } from "utils/utils";
import { useDailyTasks } from "providers/daily-tasks";
import dayjs from "dayjs";
import { Priorities } from "@daylytic/shared/constants";
import { useTags } from "providers/tag";
import { capitalize } from "utils/string";
import { presetPalettes, generate } from "@ant-design/colors";
import { adjustColor, pallets } from "utils/color";

type Presets = Required<ColorPickerProps>["presets"][number];
function genPresets(presets = presetPalettes) {
  return Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
    key: label,
  }));
}

export const RoutineSettings = () => {
  const { token } = theme.useToken();
  const [loading, setLoading] = useState(false);
  const { selectedTask, updateTask, deleteTask } = useDailyTasks();
  const { tags, updateCachedTag, createTag } = useTags();
  const [inputValue, setInputValue] = useState("");
  const [color, setColor] = useState(token.colorPrimary);
  const inputRef = useRef<InputRef>(null);

  const presets = genPresets(pallets);
  const customPanelRender: ColorPickerProps["panelRender"] = (
    _,
    { components: { Picker, Presets } },
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  const priorityOptions: { label: string; value: string }[] = [];
  const tagOptions: React.JSX.Element[] = [];
  const selectedTagOptions: React.JSX.Element[] = [];
  for (const priority of Priorities) {
    priorityOptions.push({ label: capitalize(priority.toLowerCase()), value: priority });
  }

  const handleInputConfirm = async () => {
    if (inputValue.trim() === "" || loading) {
      return;
    }

    setLoading(true);

    await createTag(inputValue.trim(), color);

    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  if(selectedTask!.current === undefined) {
    return (
      <Flex gap={"small"}>
        <Skeleton.Button active block={true} />
        <Skeleton.Button active block={true} />
        <Skeleton.Button active block={true} />
        <Skeleton.Button active shape={"circle"} />
      </Flex>
    );
  }

  for (const tag of tags) {
    const containsTask = tag.taskIds.includes(selectedTask!.current!.id);

    const palette = generate(tag.color);
    const backgroundColor = palette[1];
    const outlineColor = adjustColor(palette[3]);
    const textColor = adjustColor(palette[7]);

    const newTag = (
      <Tag
        onClose={async (event) => {
          event.preventDefault();
          if (containsTask) {
            const tagIndex = selectedTask!.current!.tagIds.indexOf(tag.id, 0);
            if (tagIndex != -1) {
              selectedTask!.current!.tagIds.splice(tagIndex, 1);

              const taskIndex = tag!.taskIds.indexOf(selectedTask!.current!.id, 0);
              tag!.taskIds.splice(taskIndex, 1);
              updateCachedTag(tag);
              await updateTask(selectedTask!.current!);
            }
          } else {
            tag.taskIds.push(selectedTask!.current!.id);
            selectedTask!.current!.tagIds.push(tag.id);
            updateTask(selectedTask!.current!);
            updateCachedTag(tag);
          }

          if (!containsTask) {
            event.preventDefault();
          }
        }}
        closeIcon={
          containsTask ? (
            <Tooltip title="Detach Tag">
              <CloseCircleOutlined style={{ color: textColor }} />
            </Tooltip>
          ) : (
            <Tooltip title="Attach Tag">
              <PlusCircleOutlined style={{ color: textColor }} />
            </Tooltip>
          )
        }
        bordered={true}
        className={styles.tag}
        style={{ color: textColor, borderColor: outlineColor }}
        closable
        color={backgroundColor}
      >
        {tag.name}
      </Tag>
    );

    if (containsTask) {
      selectedTagOptions.push(newTag);
    } else {
      tagOptions.push(newTag);
    }
  }

  const menuItems: MenuProps["items"] = [
    {
      key: "DELETE",
      label: (
        <Popconfirm
          title="Are you sure you want to delete this task?"
          onConfirm={async () => {
            await deleteTask(selectedTask!.current!.id);
          }}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      ),
      danger: true,
      onClick: () => {},
    },
  ];

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
          dayjs(selectedTask!.current!.deadline).isValid() ? dayjs(selectedTask!.current!.deadline) : null
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
              <Divider style={{ margin: "0" }} />
            ) : (
              <></>
            )}
            <Flex wrap gap={"small"}>
              {tagOptions}
            </Flex>
            <Flex gap={"small"}>
              <Space.Compact style={{ width: "100%" }}>
                <ColorPicker
                  disabled={loading}
                  defaultValue={color}
                  styles={{ popupOverlayInner: { width: 480 } }}
                  presets={presets}
                  panelRender={customPanelRender}
                  onChange={(color) => setColor(color.toHexString())}
                />
                <Input
                  ref={inputRef}
                  type="text"
                  disabled={loading}
                  placeholder="Tag name"
                  value={inputValue}
                  onChange={handleInputChange}
                  onPressEnter={handleInputConfirm}
                />
                <Button
                  loading={loading}
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleInputConfirm}
                />
              </Space.Compact>
            </Flex>
          </Flex>
        }
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
