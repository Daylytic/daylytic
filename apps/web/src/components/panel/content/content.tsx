import { Content as AntContent } from "antd/es/layout/layout";
import { ContentMap } from "utils/menu-items";
import { usePanel } from "../../../hooks/use-panel";

export const Content = () => {
  const { getMenu } = usePanel();

  const ActiveComponent = ContentMap[getMenu()] || null;

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
