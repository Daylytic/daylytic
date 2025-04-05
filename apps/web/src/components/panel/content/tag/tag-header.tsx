import { Button, Dropdown, Flex, Popover } from "antd";
import { Tag, TagHeaderSkeleton, TagManager, TagsSkeleton } from "~/components/common/tag";
import { styles, useHeader } from ".";
import { EditButton } from "~/components/common/edit-button";
import clsx from "clsx";
import { EllipsisOutlined } from "@ant-design/icons";
import { ContentTitle } from "../";

export const TagHeader = () => {
  const { fetched, selectedTag, textColor, items } = useHeader();

  return (
    <Flex justify="space-between" align="start">
      {fetched && selectedTag ? (
        <Flex
          align="center"
          gap="small"
          className={clsx(styles["header-wrapper"], "ant-typography")}
        >
          <Flex justify="center" align="center" gap="small" wrap={true}>
            <ContentTitle title="Tag" />
          </Flex>
          {fetched ? (
            <Popover
              className={styles.popover}
              placement="bottom"
              trigger="click"
              content={<TagManager tag={selectedTag} />}
            >
              <Tag tag={selectedTag}>
                <EditButton style={{ color: textColor, margin: "0" }} />
              </Tag>
            </Popover>
          ) : (
            <TagsSkeleton tagCount={1} />
          )}
        </Flex>
      ) : (
        <TagHeaderSkeleton />
      )}
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Button type="text">
          <EllipsisOutlined />
        </Button>
      </Dropdown>
    </Flex>
  );
};
