import Sider from "antd/es/layout/Sider";
import styles from "./action.module.css";
import { useMenuController } from "providers/menu-controller";
import { usePanel } from "../use-panel";
import { ActionMap } from "utils/menu-items";

export interface ActionDataProps {
    id: string;
}

export const Action = () => {
  //   const { action, setAction } = useMenuController();

  //   if (action === undefined) {
  //     return;
  //   }

  const { getMenu, getContent } = usePanel();
  const content = getContent();

  if (content === undefined) {
    return <></>;
  }

  const ActiveComponent = ActionMap[getMenu()] || null;

  return (
    <Sider width={500} id={styles.sider}>
      {ActiveComponent ? <ActiveComponent id={content}/> : <></>}
    </Sider>
  );
  //   return <>Witaj</>;
};
