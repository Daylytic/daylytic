import { Button, Flex } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useUser } from "providers/user-provider";
import { useNavigate } from "react-router";

export const HeroActions = () => {
  const { profile, login } = useUser();
  const navigate = useNavigate();

  return (
    <Flex gap={"small"}>
      <Button onClick={profile ? () => {navigate("/panel")} : login}>
        Join <GoogleOutlined />
      </Button>
    </Flex>
  );
};
