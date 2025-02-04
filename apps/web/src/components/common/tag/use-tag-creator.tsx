import { ColorPickerProps, Row } from "antd";
import { useTags } from "~/providers/tag";
import { useState } from "react";
import { Tag } from "~/types/task";
import { generatePresets, pallets } from "~/utils/color";

interface UseTagManagerProp {
  tag?: Tag;
}

export const useTagManager = ({ tag }: UseTagManagerProp) => {
  const { createTag, updateTag } = useTags();
  const [inputValue, setInputValue] = useState(tag?.name ?? "");
  const [color, setColor] = useState(pallets["General"][0]);
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

    const name = inputValue.trim();

    setLoading(true);

    if (tag) {
      tag.name = name;
      tag.color = color;
      await updateTag(tag);
    } else {
      await createTag(inputValue.trim(), color);
      setInputValue("");
    }

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
