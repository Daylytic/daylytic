import { theme, ColorPickerProps, Row } from "antd";
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
  const colorPickerPanel: ColorPickerProps["panelRender"] = (_, { components: { Presets } }) => (
    <Row justify="space-between" wrap={false}>
      <Presets />
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
