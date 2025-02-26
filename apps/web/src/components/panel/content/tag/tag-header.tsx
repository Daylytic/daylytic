import { Flex, Typography } from "antd";
import { Tag, TagsSkeleton } from "components/common/tag";
import { useTags } from "providers/tag";
import { useParams } from "react-router";
import { styles } from ".";

const { Title } = Typography;

export const TagHeader = () => {
  const { tagId } = useParams();
  const { tags, fetched } = useTags();

  const selectedTag = tags.find((tag) => tag.id === tagId);
  
  return (
    <Flex align="center" gap="small" className={"ant-typography"}>
      <Title level={1} className={styles.title}>Tag</Title>
      {fetched ? <Tag tag={selectedTag!} /> : <TagsSkeleton tagCount={1} />}
    </Flex>
  );
};
