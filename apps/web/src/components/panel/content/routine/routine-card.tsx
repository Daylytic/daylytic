import { List, Checkbox, Button, Flex, Tag, Typography, theme } from "antd";
import { Task } from "./routine";
import styles from "./routine.module.css";

const { Title } = Typography;

export const RoutineCard = (item: Task) => (
  <List.Item actions={[]} style={{ position: "relative" }}>
    <List.Item.Meta
      avatar={
        <Checkbox className={styles.checkbox} onChange={console.log}></Checkbox>
      }
      description={
        <Button
          type="text"
          onClick={() => {
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
