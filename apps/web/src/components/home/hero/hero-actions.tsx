import { Button, Flex } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useUser } from "providers/user";
import { useNavigate } from "react-router";
import { MENU_KEYS } from "utils/menu-items";

export const HeroActions = () => {
  const { profile, login } = useUser();
  const navigate = useNavigate();

  return (
    <Flex gap={"small"}>
      <Button onClick={profile ? () => {navigate(`/panel/${MENU_KEYS.DASHBOARD}`)} : login}>
        Join <GoogleOutlined />
      </Button>
    </Flex>
  );
};
