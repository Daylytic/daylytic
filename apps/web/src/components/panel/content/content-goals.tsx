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
  import { CONTENT_KEYS } from "utils/menu-items";
  
  const { Title } = Typography;
  
  interface Task {
    title: string;
    description: string;
    tags: string[];
  }
  
  export const ContentGoals = () => {
  
    const {
      token: { colorWhite, borderRadiusLG, paddingMD, paddingXS, paddingXXS },
    } = theme.useToken();
  
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
    const numberOfTasks = 7; // Change this number to generate more or fewer tasks
    const tasks = generateTasks(numberOfTasks);
  
    return (
      <Content
        style={{
          background: colorWhite,
          borderRadius: borderRadiusLG,
          padding: paddingMD,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Title level={1} style={{ margin: 0 }}>
          GOALS
        </Title>
      </Content>
    );
  };
  