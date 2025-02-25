import { Flex, Typography } from "antd";
import { Tag } from "components/common/tag";
import { useTags } from "providers/tag";
import { useParams } from "react-router";

const { Title } = Typography;

export const TagHeader = () => {
  const { tagId } = useParams();
  const { tags } = useTags();

  const selectedTag = tags.find((tag) => tag.id === tagId);

  if (!selectedTag) {
    return <></>;
  }

  return (
    <Flex align="center" gap="small">
      <Title level={1}>Tag</Title>
      <Tag tag={selectedTag} />
    </Flex>
  );
};
