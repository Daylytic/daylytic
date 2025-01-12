import { Menu } from "antd";
import { useNavigate } from "react-router";
import { getGeneralMenuItems } from "utils/menu-items";
import { useMenuController } from "providers/menu-controller";

export const MenuGeneral = () => {
  const navigate = useNavigate();
  const {menu, setMenu} = useMenuController();

  const generalItems = getGeneralMenuItems();

  return (
    <Menu
  );
};
