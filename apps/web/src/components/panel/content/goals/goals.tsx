import {
    theme,
    Typography,
  } from "antd";
  import { Content } from "antd/es/layout/layout";
  
  const { Title } = Typography;
  
  export const Goals = () => {
  
    const {
      token: { colorWhite, borderRadiusLG, paddingMD },
    } = theme.useToken();
  
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
  