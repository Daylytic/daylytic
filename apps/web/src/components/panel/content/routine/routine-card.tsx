import { List, Checkbox, Button, Flex, Tag, Typography, theme } from "antd";
import { Task } from "./routine";
import styles from "./routine.module.css";
import { useNavigate } from "react-router";
import { useDailyTasks } from "providers/daily-tasks";

const { Title } = Typography;

export const RoutineCard = (item: Task) => {
  const navigate = useNavigate();
  const { updateTask } = useDailyTasks();

  return (
    <List.Item actions={[]} style={{ position: "relative" }}>
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
        description={
          <Button
            type="text"
            onClick={() => {
              navigate(`/panel/routine/${item.id}`);
              // setAction(CONTENT_KEYS.ROUTINE);
            }}
            className={styles.button}
          >
            <Flex
              flex={1}
              gap={12}
              wrap
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left",
                justifyContent: "left",
              }}
            >
              <Title
                level={4}
                style={{ textAlign: "left", whiteSpace: "normal" }}
              >
                {item.title}
              </Title>
              <p
                style={{
                  textAlign: "left",
                  color: "rgba(0, 0, 0, 0.45)",
                  whiteSpace: "normal",
                }}
              >
                {item.description}
              </p>
              <Flex gap="4px 0" wrap style={{ width: "100%" }}>
                <Tag color="magenta">magenta</Tag>
                <Tag color="red">red</Tag>
                <Tag color="volcano">volcano</Tag>
              </Flex>
            </Flex>
          </Button>
        }
      ></List.Item.Meta>
    </List.Item>
  );
};
