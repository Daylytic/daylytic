import { faker } from "@faker-js/faker";
import {
  Col,
  ColorPicker,
  ColorPickerProps,
  Divider,
  Input,
  Modal,
  Row,
  theme,
} from "antd";
import cuid from "cuid";
import { blue, green, presetPalettes, red } from "@ant-design/colors";
import { useDailyTasks } from "providers/daily-tasks";
import { useState } from "react";
import { useTaskEditor } from "providers/task-editor";

type Presets = Required<ColorPickerProps>["presets"][number];

interface CreateTagProps {
  color: string;
  setColor: (color: string) => void;
}

function genPresets(presets = presetPalettes) {
  return Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
    key: label,
  }));
}

const CreateTag = ({ color, setColor }: CreateTagProps) => {
  const presets = genPresets({
    red,
    green,
    blue,
  });

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

  return (
    <ColorPicker
      defaultValue={color}
      styles={{ popupOverlayInner: { width: 480 } }}
      presets={presets}
      panelRender={customPanelRender}
      onChange={(color) => setColor(color.toHexString())}
    />
  );
};

export const CreateTagModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const { selectedTask, setSelectedTask } = useTaskEditor();

  return (
    <Modal
      title="Create New Tag"
      centered
      open={open}
      onOk={() => {
        setOpen(false);
        selectedTask!.tags = [
          ...selectedTask!.tags,
          {
            id: cuid(),
            name: name,
            color: color,
          },
        ];
        setSelectedTask(selectedTask);
      }}
      onCancel={() => setOpen(false)}
    >
      <Input
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <CreateTag color={color} setColor={setColor} />
    </Modal>
  );
};
