import { PlusCircleOutlined } from "@ant-design/icons";
import { Flex, Tag as AntTag, Popover } from "antd";
import Title from "antd/es/typography/Title";
import { Tag, TagManager, TagsSkeleton } from "~/components/common/tag";
import { useTags } from "~/providers/tag";
import { styles } from ".";
import clsx from "clsx";
import { useTagsNavigation } from ".";

export const Tags = () => {
  const { tags, fetched } = useTags();
  const { handleTagClick } = useTagsNavigation();

  return (
    <Flex vertical data-tour-id="menu-tags">
      <Title level={4}>Tags</Title>
      <Flex gap="small" wrap>
        {fetched ? (
          <>
            {tags.map((item) => (
              <Tag
                key={item.id}
                className="prevent-select"
                clickable
                onClick={() => handleTagClick(item.id)}
                tag={item}
              />
            ))}
            <Popover placement="bottom" trigger="click" content={<TagManager />}>
              <AntTag
                className={clsx(styles.create, "prevent-select")}
                icon={<PlusCircleOutlined />}
              >
                Create Tag
              </AntTag>
            </Popover>
          </>
        ) : (
          <TagsSkeleton tagCount={3} />
        )}
      </Flex>
    </Flex>
  );
};
