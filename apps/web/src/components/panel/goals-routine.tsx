import Sider from "antd/es/layout/Sider";
import {
  Avatar,
  Card,
  Checkbox,
  Divider,
  Flex,
  Input,
  List,
  Menu,
  Skeleton,
  Space,
  theme,
  Typography,
} from "antd";
import logo from "assets/svgs/logo.svg";
import { Content } from "antd/es/layout/layout";

import { Y } from "react-router/dist/development/fog-of-war-DLtn2OLr";
import { PlusOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

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

export const GoalsRoutine = () => {
  const {
    token: { colorWhite, borderRadiusLG, paddingMD, paddingXS },
  } = theme.useToken();

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
      <Title level={1}>Routine</Title>
      {/* 
    <Menu
      mode="inline"
      defaultSelectedKeys={["sub1"]}
      defaultOpenKeys={["sub1"]}
      items={general}
    /> */}

      <List
        itemLayout="horizontal"
        dataSource={data}
        style={{ overflowY: "auto", maxHeight: "100%", width: "100%" }}
        header={
          <List.Item>
            <Input size="large" prefix={<PlusOutlined />} placeholder="Ant Design, a design language for background applications, is refined by Ant UED Team" />
          </List.Item>
        }
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Checkbox onChange={console.log}></Checkbox>}
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    </Content>
  );
};
