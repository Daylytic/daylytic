import { List, Checkbox, Button, Flex, Tag, Typography } from "antd";
import styles from "./routine.module.css";
import { useNavigate } from "react-router";
import { useDailyTasks } from "providers/daily-tasks";
import { Task } from "types/task";
import { HolderOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const { Title } = Typography;

export const RoutineCard = ({ item }: { item: Task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    display: "flex",
    alignItems: "start",
    width: "auto !important",
    flex: "1",
  };

  const navigate = useNavigate();
  const { updateTask } = useDailyTasks();

  return (
    <List.Item ref={setNodeRef} style={style} className={styles.card} {...attributes}>
      <List.Item.Meta
        avatar={
          <Flex gap="small" justify="center" align="center">
            <HolderOutlined
              ref={setActivatorNodeRef}
              className={styles.grabber}
              {...listeners}
            />
            <Checkbox
              className={styles.checkbox}
              defaultChecked={item.isCompleted}
              onChange={async () => {
                const updatedItem = { ...item, isCompleted: !item.isCompleted };
                await updateTask(updatedItem);
              }}
            ></Checkbox>
          </Flex>
        }
        className={styles["card-meta"]}
        description={
          <Button
            type="text"
            onClick={() => navigate(`/panel/routine/${item.id}`)}
            className={styles.button}
          >
            <Flex flex={1} gap={12} wrap className={styles["button-details"]}>
              <Title level={4} className={styles["button-title"]}>
                {item.title}
              </Title>
              {/* {item.description !== "" ? (
                <p className={styles["button-description"]}>
                  {item.description}
                </p>
              ) : (
                <></>
              )} */}
              <Flex gap="4px 0" wrap className={styles["button-tags"]}>
                {item.tags.map((tag) => (
                  <Tag color={tag.color}>{tag.name}</Tag>
                ))}
              </Flex>
            </Flex>
          </Button>
        }
      ></List.Item.Meta>
    </List.Item>
  );
};
