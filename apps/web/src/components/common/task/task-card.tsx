import { List, Checkbox, Button, Flex, Typography } from "antd";
import { useNavigate } from "react-router";
import { useDailyTasks } from "providers/daily-tasks";
import { Tag as TagModel, Task } from "types/task";
import { HolderOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTags } from "providers/tag";
import { styles } from ".";
import { Tag } from "components/common/tag";

const { Title } = Typography;

interface TaskCardProps {
  item: Task;
  onClick: () => void;
  onCheckboxChange: () => Promise<void>;
  tags: TagModel[];
}

export const TaskCard = ({ item, onClick, onCheckboxChange, tags }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const cardStyles = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <List.Item ref={setNodeRef} style={cardStyles} className={styles.card} {...attributes}>
      <List.Item.Meta
        avatar={
          <Flex gap="small" justify="center" align="center" className={styles.avatar}>
            <HolderOutlined ref={setActivatorNodeRef} className={styles.grabber} {...listeners} />
            <Checkbox
              className={styles.checkbox}
              checked={item.isCompleted}
              onChange={onCheckboxChange}
            ></Checkbox>
          </Flex>
        }
        className={styles["card-meta"]}
        description={
          <Button
            type="text"
            onClick={onClick}
            className={styles.button}
          >
            <Flex flex={1} gap={12} wrap className={styles["button-details"]}>
              <Title level={4} className={styles["button-title"]}>
                {item.title}
              </Title>
              <Flex wrap gap={"small"}>
                {item.tagIds.map((tagId) => {
                  const tag = tags.find((tag) => tag.id === tagId);
                  if (!tag) {
                    return;
                  }

                  return <Tag key={tagId} tag={tag} />;
                })}
              </Flex>
            </Flex>
          </Button>
        }
      ></List.Item.Meta>
    </List.Item>
  );
};
