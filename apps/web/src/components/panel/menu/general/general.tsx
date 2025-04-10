import { Menu } from "antd";
import { useGeneralMenu } from ".";

export const General = () => {
  const { currentMenu, generalItems, handleMenuClick } = useGeneralMenu();

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={[currentMenu]}
      selectedKeys={[currentMenu]}
      defaultOpenKeys={[currentMenu]}
      onClick={handleMenuClick}
      items={generalItems}
    />
  );
};