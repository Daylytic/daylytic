import { Card, Flex, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Space, Typography } from "antd";
import logo from "assets/svgs/logo.svg";

const { Text, Title } = Typography;

const general = [
  {
    key: `sub1`,
    label: `Dashboard`,
  },
  {
    key: `sub2`,
    label: `Routine`,
  },
  {
    key: `sub3`,
    label: `Upcoming`,
  },
  {
    key: `sub4`,
    label: `Calendar`,
  },
];

const goals = [
  {
    key: `sub5`,
    label: (
      <Card
        title="Learn how to code in c++"
        extra={<a href="#">More</a>}
        style={{ width: 300 }}
      >
        <p>Study so that by the end of the year I can create basic programs.</p>
      </Card>
    ),

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = 1 * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  },
];

export const GoalsMenu = () => {
  const {
    token: { colorBgLayout, borderRadiusLG, paddingMD, paddingXS },
  } = theme.useToken();

  return (
    <Sider
      style={{
        borderRadius: borderRadiusLG,
        padding: paddingMD,
      }}
      width={400}
    >
      <Flex gap={paddingXS}>
        <img height="38px" src={logo} />
        <Title level={2}>Daylytic</Title>
      </Flex>

      <Menu
        mode="inline"
        defaultSelectedKeys={["sub1"]}
        defaultOpenKeys={["sub1"]}
        items={general}
      />

      <Title level={4}>Goals</Title>
      <Card
      hoverable
        title="Learn how to code in c++"
        extra={<a href="#">More</a>}
        style={{ width: "100%" }}
      >
        <p>Study so that by the end of the year I can create basic programs.</p>
      </Card>
    </Sider>
  );
};
