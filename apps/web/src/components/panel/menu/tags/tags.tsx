import { PlusCircleOutlined } from "@ant-design/icons";
import { Flex, Tag as AntTag, Popover } from "antd";
import Title from "antd/es/typography/Title";
import { Tag, TagCreator, TagsSkeleton } from "components/common/tag";
import { useTags } from "providers/tag";
import { styles } from ".";
import clsx from "clsx";
import { useNavigate } from "react-router";
import { getTagRoute } from "utils/routes";

export const Tags = () => {
  const navigate = useNavigate();
  const { tags, fetched } = useTags();

  return (
    <>
      <Title level={4}>Tags</Title>
      <Flex gap="small" wrap>
        {fetched ? (
          tags.map((item) => (
          <Tag
              className="prevent-select"
            clickable
              onClick={() => navigate(getTagRoute(item.id))}
            tag={item}
          />
          ))
        ) : (
          <TagsSkeleton tagCount={3} />
        )}
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
