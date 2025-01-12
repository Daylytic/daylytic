import React from "react";
import { useContext, useState } from "react";
import { MENU_KEYS } from "utils/menu-items";

interface MenuControllerContextType {
  menu: string;
  setMenu: (menu: string) => void;
}

const MenuControllerContext = React.createContext<
  MenuControllerContextType | undefined
>(undefined);

export const MenuControllerProvider = ({ children }) => {
  const [menu, setMenu] = useState<string>(MENU_KEYS.DASHBOARD);

  return (
    <MenuControllerContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuControllerContext.Provider>
  );
};

export const useMenuController = () => {
  const context = useContext(MenuControllerContext);
  if (!context) {
    throw new Error(
      "useMenuController must be used within a MenuControllerContext"
    );
  }
  return context;
};
