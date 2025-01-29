import { List, Checkbox, Button, Flex, Tag, Typography } from "antd";
import styles from "./routine.module.css";
import { useNavigate } from "react-router";
import { useDailyTasks } from "providers/daily-tasks";
import { Task } from "types/task";

const { Title } = Typography;

export const RoutineCard = ({ item }: { item: Task }) => {
  const navigate = useNavigate();
  const { updateTask } = useDailyTasks();

  return (
    <List.Item style={{ position: "relative", flex: "1" }}>
      <List.Item.Meta
        avatar={
          <Checkbox
            className={styles.checkbox}
            defaultChecked={item.isCompleted}
            onChange={async () => {
              const updatedItem = { ...item, isCompleted: !item.isCompleted };
              await updateTask(updatedItem);
            }}
          ></Checkbox>
        }
        className={styles["checkbox-wrapper"]}
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
