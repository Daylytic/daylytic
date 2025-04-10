import { Drawer, Flex } from "antd";
import { useNavigate, useLocation } from "react-router";
import { styles } from "~/components/layout";
import { ActionProps } from ".";
import { useLayout } from "~/providers/layout";

export const ActionDrawer = ({ children }: ActionProps) => {
  const { showAction, setShowAction } = useLayout();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <Drawer
      className={styles.drawer}
      size="default"
      placement="right"
      closable={false}
      open={showAction}
      onClose={() => {
        setShowAction(!showAction);
      }}
      afterOpenChange={(visible) => {
        if (!visible) {
          if (pathSegments.length >= 3) {
            navigate("..");
          }
        }
      }}
    >
      <Flex vertical className={styles["wrapper"]}>
        {children}
      </Flex>
    </Drawer>
  );
};
