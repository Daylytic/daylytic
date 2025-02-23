import { generate } from "@ant-design/colors";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Priorities } from "@daylytic/shared/constants";
import { theme, ColorPickerProps, Row, Col, Divider, Tooltip, MenuProps, Popconfirm } from "antd";
import { useTags } from "providers/tag";
import { useState } from "react";
import { adjustColor, generatePresets, pallets } from "utils/color";
import { capitalize } from "utils/string";
import { Tag } from "components/common/tag";
import { Task } from "types/task";

import {styles} from ".";

interface UseSettingsProps {
  selectedTask: React.MutableRefObject<Task | undefined>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

export const useSettings = ({ selectedTask, updateTask, deleteTask }: UseSettingsProps) => {
  const { token } = theme.useToken();
  const { tags, updateCachedTag, createTag } = useTags();
  const [inputValue, setInputValue] = useState("");
  const [color, setColor] = useState(token.colorPrimary);
  const [loading, setLoading] = useState(false);

  const presets = generatePresets(pallets);
  const colorPickerPanel: ColorPickerProps["panelRender"] = (
    _,
    { components: { Picker, Presets } },
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider type="vertical" className={styles["color-picker-divder"]} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  const priorityOptions: { label: string; value: string }[] = [];
  const tagOptions: React.JSX.Element[] = [];
  const selectedTagOptions: React.JSX.Element[] = [];

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

  for (const priority of Priorities) {
    priorityOptions.push({ label: capitalize(priority.toLowerCase()), value: priority });
  }

  for (const tag of tags) {
    const containsTask = tag.taskIds.includes(selectedTask!.current!.id);

    const palette = generate(tag.color);
    const textColor = adjustColor(palette[7]);

    const newTag = (
      <Tag
        tag={tag}
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
        closable={true}
      />
    );

    if (containsTask) {
      selectedTagOptions.push(newTag);
    } else {
      tagOptions.push(newTag);
    }
  }

  return {
    presets,
    colorPickerPanel,
    handleInputConfirm,
    handleInputChange,
    loading,
    inputValue,
    setColor,
    color,
    tagOptions,
    menuItems,
    priorityOptions,
    selectedTagOptions,
  };
};
