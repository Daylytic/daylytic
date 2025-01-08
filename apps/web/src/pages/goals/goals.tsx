import { FloatButton, Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { GoalsList } from "components/panel/goals-list";
import { GoalsHeader } from "components/panel/goals-header";

export const Goals = () => (
  <Layout>
    <section>
      <Content
        style={{
          flexDirection: "column",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: "unset",
        }}
      >
        <GoalsHeader />
        <GoalsList />
      </Content>
    </section>
  </Layout>
);
