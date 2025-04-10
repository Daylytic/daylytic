import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Input, Space } from "antd";
import { useTagManager } from "~/components/common/tag/use-tag-creator";
import { styles } from ".";
import { Tag } from "~/types/task";

interface TagManagerProp {
  tag?: Tag;
}

export const TagManager = ({ tag }: TagManagerProp) => {
  const {
    handleInputChange,
    handleInputConfirm,
    presets,
    colorPickerPanel,
    color,
    setColor,
    loading,
    inputValue,
  } = useTagManager({ tag });

  return (
    <Space.Compact className={styles["tag-creator"]}>
      <ColorPicker
        disabled={loading}
        defaultValue={tag ? tag.color : color}
        presets={presets}
        panelRender={colorPickerPanel}
        onChange={(color) => setColor(color.toHexString())}
      />
      <Input
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
        icon={tag ? <SaveOutlined /> : <PlusOutlined />}
        onClick={handleInputConfirm}
      />
    </Space.Compact>
  );
};
