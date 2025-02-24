import { PlusCircleOutlined } from "@ant-design/icons";
import { Flex, Tag as AntTag, Popover } from "antd";
import Title from "antd/es/typography/Title";
import { Tag, TagCreator } from "components/common/tag";
import { useTags } from "providers/tag";
import { styles } from ".";
import clsx from "clsx";
export const Tags = () => {
  const { tags } = useTags();

  return (
    <>
      <Title level={4}>Tags</Title>
      <Flex gap="small" wrap>
        {tags.map((item) => (
          <Tag
            className={clsx("prevent-select")}
            clickable
            onClick={() => {
              console.log("ON CLICK WORKS!");
            }}
            tag={item}
          />
        ))}
        <Popover placement="bottom" trigger="click" content={<TagCreator />}>
          <AntTag
            className={clsx(styles.create, "prevent-select")}
            onClick={() => {}}
            icon={<PlusCircleOutlined />}
          >
            Create Tag
          </AntTag>
        </Popover>
      </Flex>
    </>
  );
};
