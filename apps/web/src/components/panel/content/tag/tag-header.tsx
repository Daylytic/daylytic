import { Flex, Typography } from "antd";
import { Tag } from "components/common/tag";
import { usePanel } from "hooks/use-panel";
import { useTags } from "providers/tag";

const { Title } = Typography;

export const TagHeader = () => {
  const { getContent } = usePanel();
  const { tags } = useTags();

  const selectedTag = tags.find((tag) => tag.id === getContent());

  if(!selectedTag) {
    return <></>;
  }

  return (
    <Flex align="center" gap="small">
      <Title level={1}>Tag</Title>
      <Tag tag={selectedTag}/>
    </Flex>
  );
};
