import { Flex, FloatButton, Layout, Menu, MenuProps, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { GoalsMenu } from "components/panel/goals-menu";
import { GoalsRoutine } from "components/panel/goals-routine";

export const Goals = () => {
  const {
    token: { borderRadiusLG, paddingMD },
  } = theme.useToken();

  return (
    <Layout
      style={{
        padding: "24px 24px",
        borderRadius: borderRadiusLG,
        height: "100vh",
      }}
    >
      <Flex gap={paddingMD} flex={1}>
        <GoalsMenu />
        <GoalsRoutine></GoalsRoutine>
        <Sider style={{}} width={500}></Sider>
      </Flex>
    </Layout>
  );
  // <Layout>
  //   <section>
  //     <Content
  //       style={{
  //         flexDirection: "column",
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         lineHeight: "unset",
  //       }}
  //     >
  //       <GoalsHeader />
  //       <GoalsList />
  //     </Content>
  //   </section>
  // </Layout>
};
