import { Drawer } from "antd";
import { useNavigate, useLocation } from "react-router";
import { ActionProps, styles } from ".";
import { useLayout } from "~/providers/layout";

export const ActionDrawer = ({ children }: ActionProps) => {
  const { showAction, setShowAction } = useLayout();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  return (
    <Drawer
      rootClassName={styles.drawer}
      size="default"
      placement="right"
      closable={false}
      open={showAction}
      onClose={() => {
        setShowAction(!showAction);
      }}
      motion={{
        motionAppear: false,
      }}
      afterOpenChange={(visible) => {
        if (!visible) {
          if (pathSegments.length >= 3) {
            navigate("..");
          }
        }
      }}
    >
      {children}
    </Drawer>
  );
};
