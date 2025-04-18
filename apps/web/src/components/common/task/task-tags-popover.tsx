import { Button, Popover, Divider, Flex } from "antd";
import { TagsOutlined } from "@ant-design/icons";
import { TagManager } from "~/components/common/tag";
import clsx from "clsx";

interface TaskTagsPopoverProps {
  selectedTagOptions: React.ReactNode[];
  tagOptions: React.ReactNode[];
  styles: React.CSSProperties;
}

export const TaskTagsPopover = ({
  selectedTagOptions,
  tagOptions,
  styles,
}: TaskTagsPopoverProps) => {
  return (
    <Popover
      placement="bottom"
      content={
        <Flex vertical className={styles["tag-popover"]} gap="small">
          <Flex wrap gap="small">
            {selectedTagOptions}
          </Flex>
          {selectedTagOptions.length > 0 && tagOptions.length > 0 && (
            <Divider className={styles["tags-divider"]} />
          )}
          <Flex wrap gap="small">
            {tagOptions}
          </Flex>
          <Flex gap="small">
            <TagManager />
          </Flex>
        </Flex>
      }
      trigger="click"
    >
      <Button
        icon={<TagsOutlined />}
        color="default"
        variant="filled"
        className={clsx(styles["settings-button"], styles["tags-button"])}
      >
        Tags
      </Button>
    </Popover>
  );
};
