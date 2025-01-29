import Sider from "antd/es/layout/Sider";
import styles from "./action.module.css";
import { usePanel } from "../../../hooks/use-panel";
import { ActionMap } from "utils/menu-items";

export interface ActionDataProps {
  id: string;
}

export const Action = () => {
  const { getMenu, getContent } = usePanel();
  const content = getContent();

  if (content === undefined) {
    return <></>;
  }

  const ActiveComponent = ActionMap[getMenu()] || null;

  return (
    <Sider width={500} id={styles.sider}>
      {ActiveComponent ? <ActiveComponent id={content} /> : <></>}
    </Sider>
  );
};
