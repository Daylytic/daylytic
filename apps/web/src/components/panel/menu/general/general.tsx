import { Menu } from "antd";
import { useNavigate } from "react-router";
import { getGeneralMenuItems } from "utils/menu-items";
import { usePanel } from "hooks/use-panel";

export const General = () => {
  const navigate = useNavigate();
  const { getMenu } = usePanel();

  const currentMenu = getMenu();

  const generalItems = getGeneralMenuItems();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[currentMenu]}
      selectedKeys={[currentMenu]}
      defaultOpenKeys={[currentMenu]}
      onClick={({ key }) => navigate(`/panel/${key}`)}
      items={generalItems}
    />
  );
};
