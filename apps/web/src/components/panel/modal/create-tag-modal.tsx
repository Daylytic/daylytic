import { faker } from "@faker-js/faker";
import { Col, ColorPicker, ColorPickerProps, Divider, Input, Modal, Row, theme } from "antd";
import cuid from "cuid";
import { blue, green, presetPalettes, red } from '@ant-design/colors';
import { useDailyTasks } from "providers/daily-tasks";

type Presets = Required<ColorPickerProps>['presets'][number];

function genPresets(presets = presetPalettes) {
  return Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors, key: label }));
}

const HorizontalLayoutDemo = () => {
  const { token } = theme.useToken();

  const presets = genPresets({
    red,
    green,
    blue,
  });

  const customPanelRender: ColorPickerProps['panelRender'] = (
    _,
    { components: { Picker, Presets } },
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider type="vertical" style={{ height: 'auto' }} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  return (
    <ColorPicker
      defaultValue={token.colorPrimary}
      styles={{ popupOverlayInner: { width: 480 } }}
      presets={presets}
      panelRender={customPanelRender}
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
  const { setSelectedTask, selectedTask } = useDailyTasks();

  return (
    <Modal
      title="Vertically centered modal dialog"
      centered
      open={open}
      onOk={() => {
        setOpen(false);
        selectedTask!.tags = [
          ...selectedTask!.tags,
          {
            id: cuid(),
            name: faker.animal.petName(),
            color: faker.color.rgb(),
          },
        ];
        setSelectedTask(selectedTask);
      }}
      onCancel={() => setOpen(false)}
    >
      <Input placeholder="Name of the tag" />
      <HorizontalLayoutDemo />
    </Modal>
  );
};
