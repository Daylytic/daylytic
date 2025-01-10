import {
  Button,
  Checkbox,
  Flex,
  Input,
  List,
  Tag,
  theme,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { faker } from "@faker-js/faker";

const { Text, Title } = Typography;

interface Task {
  title: string;
  description: string;
  tags: string[];
}

export const ContentRoutine = () => {
  const {
    token: { colorWhite, borderRadiusLG, paddingMD, paddingXS, paddingXXS },
  } = theme.useToken();

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  const generateTasks = (numberOfTasks: number): Task[] => {
    return Array.from({ length: numberOfTasks }, () => ({
      title: faker.lorem.words(5), // Generate a random title
      description: faker.lorem.sentence({ min: 5, max: 15 }), // Generate a random description
      tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        faker.lorem.word()
      ), // Generate a random list of tags
    }));
  };

  // Example usage
  const numberOfTasks = 5; // Change this number to generate more or fewer tasks
  const tasks = generateTasks(numberOfTasks);

  return (
    <Content
      style={{
        background: colorWhite,
        borderRadius: borderRadiusLG,
        padding: paddingMD,
        width: "100%",
        flex: 1,
      }}
    >
      <Title level={1} style={{ margin: 0 }}>
        Routine
      </Title>

      <List
        itemLayout="vertical"
        dataSource={tasks}
        style={{ overflowY: "auto", maxHeight: "100%", width: "100%" }}
        header={
          <List.Item>
            <Input
              size="large"
              prefix={<PlusOutlined />}
              placeholder="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        }
        renderItem={(item, index) => (
          <List.Item actions={[]} style={{ position: "relative" }}>
            <List.Item.Meta
              avatar={<Checkbox style={{paddingBlock: paddingXXS}} onChange={console.log}></Checkbox>}
              style={{ margin: 0 }}
              description={
                <Button
                  type="text"
                  style={{
                    width: "100%",
                    height: "100%",
                    alignItems: "left",
                    justifyContent: "left",
                    paddingBlock: paddingXXS,
                  }}
                >
                  <Flex
                    flex={1}
                    gap={12}
                    wrap
                    style={{ display: "flex", flexDirection: "column", alignItems: "left", justifyContent: "left" }}
                  >
                    <Title level={4} style={{textAlign: "left", whiteSpace: "normal"}}>{item.title}</Title>
                    <p style={{textAlign: "left", color: "rgba(0, 0, 0, 0.45)", whiteSpace: "normal"}}>{item.description}</p>
                    <Flex gap="4px 0" wrap style={{ width: "100%" }}>
                      <Tag color="magenta">magenta</Tag>
                      <Tag color="red">red</Tag>
                      <Tag color="volcano">volcano</Tag>
                    </Flex>
                  </Flex>
                </Button>
              }
            ></List.Item.Meta>
            {/* <div onClick={console.log} style={{ cursor: "pointer" }}>
              <List.Item.Meta
                avatar={<Checkbox onChange={console.log}></Checkbox>}
                title={item.title}
                style={{ margin: 0 }}
                description={
                  <Flex flex={1} gap={12} style={{display: "flex", flexDirection:"column"}}>
                    {item.description}
                    <Flex gap="4px 0" wrap style={{ width: "100%" }}>
                      <Tag color="magenta">magenta</Tag>
                      <Tag color="red">red</Tag>
                      <Tag color="volcano">volcano</Tag>
                    </Flex>
                  </Flex>
                }
              ></List.Item.Meta>
            </div> */}
          </List.Item>
        )}
      />
    </Content>
  );
};
