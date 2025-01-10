import { Flex, FloatButton, Layout, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { ContentRoutine } from "components/panel/content/content-routine";
import { Menu } from "components/panel/menu";

export const Panel = () => {
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
      <Flex gap={paddingMD} flex={1} style={{height: "100%"}}>
        <Menu />
        <ContentRoutine></ContentRoutine>
        {/* <Sider style={{}} width={500}></Sider> */}
      </Flex>
    </Layout>
  );
};
