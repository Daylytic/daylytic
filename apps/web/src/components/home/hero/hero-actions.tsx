import { Button, Flex } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useUser } from "providers/user-provider";

export const HeroActions = () => {
  const { profile, login, logout } = useUser();

  return (
    <Flex gap={"small"}>
      {profile ? (
        <Button onClick={logout}>Welcome back, {profile.name}</Button>
      ) : (
        <Button onClick={login}>
          Join <GoogleOutlined />
        </Button>
      )}
    </Flex>
  );
};
