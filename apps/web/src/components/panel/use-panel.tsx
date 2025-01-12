import { useMatch } from "react-router";

export const usePanel = () => {
  const match = useMatch("/panel/:menu/:content?/:action?");

  const getMenu = () => {
    const menu = match?.params.menu || "dashboard";
    return menu;
  };

  const getContent = () => {
    return match?.params.content || undefined;
  }

  return { getMenu, getContent };
};
