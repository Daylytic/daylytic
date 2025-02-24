import { PlusOutlined } from "@ant-design/icons";
import { Button, ColorPicker, Input, Space } from "antd";
import { useTagCreator } from "components/common/tag/use-tag-creator";
import {styles} from ".";

export const TagCreator = () => {
  const {
    handleInputChange,
    handleInputConfirm,
    presets,
    colorPickerPanel,
    color,
    setColor,
    loading,
    inputValue,
  } = useTagCreator();

  return (
    <Space.Compact className={styles["tag-creator"]}>
      <ColorPicker
        disabled={loading}
        defaultValue={color}
        styles={{ popupOverlayInner: { width: 480 } }}
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
        icon={<PlusOutlined />}
        onClick={handleInputConfirm}
      />
    </Space.Compact>
  );
};
