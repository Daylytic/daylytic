import { DownOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useHeaderHeight, scrollToElement } from "~/utils/scroll";
import { styles } from ".";

export const HeroScrollDown = () => {
  const headerHeight = useHeaderHeight();

  const scrollToAbout = () => {
    scrollToElement("about", headerHeight);
  };

  return (
    <Tooltip title="Scroll down" placement="top">
      <Button
        color="primary"
        variant="link"
        onClick={scrollToAbout}
        icon={<DownOutlined />}
        className={styles.scroll}
        size="large"
      />
    </Tooltip>
  );
};
