import { List, Checkbox, Button, Flex, Typography } from "antd";
import { Tag as TagModel, Task } from "types/task";
import { HolderOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { styles } from ".";
import { Tag } from "components/common/tag";

const { Title } = Typography;

interface TaskCardProps {
  orderable: boolean;
  item: Task;
  onClick: () => void;
  onCheckboxChange: () => Promise<void>;
  tags: TagModel[];
}

export const TaskCard = ({ orderable, item, onClick, onCheckboxChange, tags }: TaskCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const cardStyles = orderable
    ? {
        transform: CSS.Translate.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }
    : {};

  return (
    <List.Item
      // Use sortable ref and attributes only if orderable.
      ref={orderable ? setNodeRef : undefined}
      style={cardStyles}
      className={styles.card}
      {...(orderable ? attributes : {})}
    >
      <List.Item.Meta
        avatar={
          <Flex gap="small" justify="center" align="center" className={styles.avatar}>
            {/* Render grabber only for orderable cards */}
            {orderable && (
              <HolderOutlined ref={setActivatorNodeRef} className={styles.grabber} {...listeners} />
            )}
            <Checkbox
              className={styles.checkbox}
              checked={item.isCompleted}
              onChange={onCheckboxChange}
            />
          </Flex>
        }
        className={styles["card-meta"]}
        description={
          <Button type="text" onClick={onClick} className={styles.button}>
            <Flex flex={1} gap={12} wrap className={styles["button-details"]}>
              <Title level={4} className={styles["button-title"]}>
                {item.title}
              </Title>
              <Flex wrap gap="small">
                {item.tagIds.map((tagId) => {
                  const tag = tags.find((tag) => tag.id === tagId);
                  if (!tag) return null;
                  return <Tag key={tagId} tag={tag} />;
                })}
              </Flex>
            </Flex>
          </Button>
        }
      />
    </List.Item>
  );
};
