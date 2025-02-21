import { generate } from "@ant-design/colors";
import { Tag as AntTag } from "antd";
import { Tag as TagModel } from "types/task";
import { styles } from "components/panel/content/routine";
import { adjustColor } from "utils/color";

interface TagProps {
  tag: TagModel;
  onClose: ((e: React.MouseEvent<HTMLElement>) => void) | undefined;
  closeIcon: React.ReactNode;
  closable: boolean | undefined;
}

export const Tag = ({ tag, onClose, closeIcon, closable }: TagProps) => {
  const palette = generate(tag.color);
  const backgroundColor = palette[1];
  const outlineColor = adjustColor(palette[3]);
  const textColor = adjustColor(palette[7]);

  return (
    <AntTag
      bordered={true}
      className={styles.tag}
      style={{ color: textColor, borderColor: outlineColor }}
      color={backgroundColor}
      onClose={onClose}
      closeIcon={closeIcon}
      closable={closable}
    >
      {tag.name}
    </AntTag>
  );
};
