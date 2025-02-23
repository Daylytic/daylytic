import { List, Checkbox, Button, Flex, Typography, Tag } from "antd";
import styles from "./routine.module.css";
import { useNavigate } from "react-router";
import { useDailyTasks } from "providers/daily-tasks";
import { Task } from "types/task";
import { HolderOutlined } from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTags } from "providers/tag";
import { generate } from "@ant-design/colors";
import { adjustColor } from "utils/color";

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
  const { updateTask, selectedTask, tasks } = useDailyTasks();
  const { tags } = useTags();

  return (
    <List.Item ref={setNodeRef} style={style} className={styles.card} {...attributes}>
      <List.Item.Meta
        avatar={
          <Flex gap="small" justify="center" align="center" className={styles.avatar}>
            <HolderOutlined ref={setActivatorNodeRef} className={styles.grabber} {...listeners} />
            <Checkbox
              className={styles.checkbox}
              onChange={async () => await updateTask({ ...item, isCompleted: !item.isCompleted })}
            ></Checkbox>
          </Flex>
        }
        className={styles["card-meta"]}
        description={
          <Button
            type="text"
            onClick={() => {
              const task = tasks.find((task) => task.id === item.id);
              selectedTask.current = task;
              navigate(`/panel/routine/${item.id}`);
            }}
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

                  const palette = generate(tag.color);
                  const backgroundColor = palette[1];
                  const outlineColor = adjustColor(palette[3]);
                  const textColor = adjustColor(palette[7]);

                  return (
                    <Tag
                      bordered={true}
                      className={styles.tag}
                      style={{ color: textColor, borderColor: outlineColor,margin: "0" }}
                      color={backgroundColor}
                    >
                      {tag.name}
                    </Tag>
                  );
                })}
              </Flex>
            </Flex>
          </Button>
        }
      ></List.Item.Meta>
    </List.Item>
  );
};
