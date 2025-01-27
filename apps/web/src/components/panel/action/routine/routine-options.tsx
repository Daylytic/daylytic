import {
  Row,
  Col,
  DatePicker,
  Flex,
  Select,
  SelectProps,
  Tag as AntTag,
  Button,
  Divider,
  Input,
  Space,
  InputRef,
  theme,
  ColorPickerProps,
  ColorPicker,
} from "antd";
import dayjs from "dayjs";
import { useDailyTasks } from "providers/daily-tasks";
import { useRef, useState } from "react";
import styles from "./routine.module.css";
import { Tag } from "types/task";
import { PlusOutlined } from "@ant-design/icons";
import cuid from "cuid";
import { blue, green, presetPalettes, red } from "@ant-design/colors";

type TagRender = SelectProps["tagRender"];
type Presets = Required<ColorPickerProps>["presets"][number];
function genPresets(presets = presetPalettes) {
  return Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
    key: label,
  }));
}

export const RoutineOptions = () => {
  const { token } = theme.useToken();
  const { tasks, updateTask, selectedTask, setSelectedTask } = useDailyTasks();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState(token.colorPrimary);
  const inputRef = useRef<InputRef>(null);

  const tags = [...tasks].flatMap((task) => task.tags);

  const presets = genPresets({
    red,
    green,
    blue,
  });

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const customPanelRender: ColorPickerProps["panelRender"] = (
    _,
    { components: { Picker, Presets } }
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

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    selectedTask!.tags = [
      ...selectedTask!.tags,
      {
        id: cuid(),
        name: name,
        color: color,
      },
    ];
    console.log("SELECTED ", selectedTask);
    setSelectedTask(selectedTask);
    updateTask(selectedTask!);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    const tag = selectedTask?.tags.find((tag) => tag.id === value);
    if (!tag) {
      return <></>;
    }

    return (
      <AntTag
        color={tag!.color ?? null}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        className={styles.tag}
      >
        {label}
      </AntTag>
    );
  };

  return (
    <>
      <Row>
        <Col span={18} push={6}>
          <DatePicker
            value={
              selectedTask!.deadline ? dayjs(selectedTask!.deadline) : null
            }
            className={styles["date-picker"]}
            onChange={(date) => {
              const isoDate = date?.toISOString() || null;
              if (isoDate === null) {
                return;
              }

              selectedTask!.deadline = isoDate;
              setSelectedTask(selectedTask);
              updateTask(selectedTask!);
            }}
          />
        </Col>
        <Col span={6} pull={18}>
          Deadline
        </Col>
      </Row>
      <Row>
        <Col span={18} push={6}>
          <Flex gap="4px 0" wrap id={styles["tags-wrapper"]}>
            <Select
              mode="multiple"
              tagRender={tagRender}
              className={styles["tags-select"]}
              value={selectedTask!.tags.map((tag) => tag.id)}
              options={[
                ...tags.map((tag) => {
                  return {
                    id: tag.id,
                    color: tag.color,
                    value: tag.id,
                    name: tag.name,
                    label: tag.name,
                  };
                }),
              ]}
              onChange={(value, selectedOptions) => {
                console.log([value, selectedOptions]);
                if (!selectedOptions) {
                  return;
                }
                selectedTask!.tags = selectedOptions as Tag[];
                console.log("SELECTED ", selectedTask);
                setSelectedTask(selectedTask);
                updateTask(selectedTask!);
              }}
              // dropdownRender={dropdownRender}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="Tag name"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <ColorPicker
                      defaultValue={color}
                      styles={{ popupOverlayInner: { width: 480 } }}
                      presets={presets}
                      panelRender={customPanelRender}
                      onChange={(color) => setColor(color.toHexString())}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Create
                    </Button>
                  </Space>
                </>
              )}
              placeholder="Please select"
            ></Select>
          </Flex>
        </Col>
        <Col span={6} pull={18}>
          Tags
        </Col>
      </Row>
      <Row>
        <Col span={18} push={6}>
          <Input placeholder="1" />
        </Col>
        <Col span={6} pull={18}>
          Priority
        </Col>
      </Row>
    </>
  );
};
