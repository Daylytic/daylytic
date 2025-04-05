import { MenuOutlined } from "@ant-design/icons";
import { Button, Flex, Grid } from "antd";
import { useLayout } from "~/providers/layout";
import { styles } from ".";

const { useBreakpoint } = Grid;

export const ContentHeaderAction = () => {
  const screens = useBreakpoint();
  const { showMenu, setShowMenu } = useLayout();
  const isMobile = !screens.xl;

  if (!isMobile) {
    return <></>;
  }

  return (
    <Flex align="center" justify="center" className={styles.menu}>
      <Button
        icon={<MenuOutlined />}
        shape="circle"
        type="text"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      />
    </Flex>
  );
};
