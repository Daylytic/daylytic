import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useCookies } from "react-cookie";

export const GoalsHeader = () => {

  return (
    <>
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Hi, Łukasz <Avatar>Ł</Avatar>
      </h1>
    </>
  );
};
