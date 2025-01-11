import React from "react";
import { createContext, useContext, useState } from "react";

interface MenuControllerContextType {
  menu: string;
  setMenu: (menu: string) => void;
}

const MenuControllerContext = React.createContext<
  MenuControllerContextType | undefined
>(undefined);

export const MenuControllerProvider = ({ children }) => {
  const [menu, setMenu] = useState<string>("dashboard");

  return (
    <MenuControllerContext.Provider
      value={{ menu, setMenu }}
    ></MenuControllerContext.Provider>
  );
};

export const useMenuController = () => {
  const context = useContext(MenuControllerContext);
  if (!context) {
    throw new Error("useMenuController must be used within a MenuControllerContext");
  }
  return context;
}