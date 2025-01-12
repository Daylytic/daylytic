import { Content as AntContent } from "antd/es/layout/layout";
import { ComponentMap } from "utils/menu-items";
import { usePanel } from "../use-panel";

export const Content = () => {
  const { getMenu } = usePanel();

  const ActiveComponent = ComponentMap[getMenu()] || null;

  return (
    <AntContent>
      {ActiveComponent ? (
        <ActiveComponent />
      ) : (
        <></>
      )}
    </AntContent>
  );
};
