import { generate } from "@ant-design/colors";
import { Tag as AntTag } from "antd";
import { Tag as TagModel } from "types/task";
import { styles } from ".";
import { adjustColor } from "utils/color";
import clsx from "clsx";

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  tag: TagModel;
  onClose?: ((e: React.MouseEvent<HTMLElement>) => void) | undefined;
  closeIcon?: React.ReactNode;
  closable?: boolean | undefined;
  clickable?: boolean;
}

export const Tag = ({
  className,
  tag,
  onClose,
  closeIcon,
  closable,
  clickable,
  ...rest
}: TagProps) => {
  const palette = generate(tag.color);
  const backgroundColor = palette[5];
  const outlineColor = adjustColor(palette[6]);
  const textColor = adjustColor(palette[0]);

  return (
    <AntTag
      bordered={true}
      className={clsx(styles.tag, clickable && styles.clickable, className)}
      style={{ color: textColor, borderColor: outlineColor }}
      color={backgroundColor}
      onClose={onClose}
      closeIcon={closeIcon}
      closable={closable}
      {...rest}
    >
      {tag.name}
    </AntTag>
  );
};
