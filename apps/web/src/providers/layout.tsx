import React, { createContext, useContext, useState } from "react";

interface LayoutContextType {
  showMenu: boolean;
  setShowMenu: (value: boolean) => void;
  showAction: boolean;
  setShowAction: (value: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider = ({ children }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showAction, setShowAction] = useState<boolean>(true);

  return (
    <LayoutContext.Provider value={{ showMenu, setShowMenu, showAction, setShowAction }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
