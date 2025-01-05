import { CalendarOutlined, PlusOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { useCookies } from "react-cookie";

export const GoalsHeader = () => {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);

  const createGoal = () => {
    if (cookies.token !== undefined) {
      fetch("http://localhost:8084/oauth2/google", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ token: cookies.token }),
      })
        .then(async (res) => {
          console.log(1);
          if (res.ok) {
            console.log(2);
            const { user } = await res.json();
          }
        })
        .catch((res) => {
          console.log(3);
          console.log(res);
        });
    }
  };

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
      <Flex gap={"2rem"}>
        <CalendarOutlined style={{ fontSize: "25px" }} />
        <span>&#9679;</span>
        <Button onClick={createGoal}>
          <PlusOutlined style={{ fontSize: "25px" }} />
        </Button>
      </Flex>
    </>
  );
};
