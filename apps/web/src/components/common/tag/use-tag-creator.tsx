import { theme, ColorPickerProps, Row, Col, Divider } from "antd";
import { styles } from "components/common/tag";
import { useTags } from "providers/tag";
import { useState } from "react";
import { generatePresets, pallets } from "utils/color";

export const useTagCreator = () => {
  const { token } = theme.useToken();
  const { createTag } = useTags();
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

  return {
    handleInputChange,
    handleInputConfirm,
    colorPickerPanel,
    presets,
    color,
    setColor,
    loading,
    inputValue,
  };
};
