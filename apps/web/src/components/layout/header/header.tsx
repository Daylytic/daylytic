import { useRef, useState } from "react";
import { Header as AntHeader } from "antd/es/layout/layout";
import { Anchor, Avatar, Button, Flex, Skeleton, Tooltip } from "antd";
import { styles, useHeader } from ".";
import { useHeaderHeight } from "~/utils/scroll";
import { GithubOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";

export const Header = () => {
  const headerHeight = useHeaderHeight();
  const topRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const { isDarkMode, picture, anchorItems, handleThemeChange } = useHeader();

  return (
    <AntHeader id={styles.header} ref={topRef}>
      <Flex align="center" className={styles.icons}>
        <a
          href="https://github.com/Daylytic/daylytic"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
        >
          <Button type="text" size="large" icon={<GithubOutlined />} draggable={false} />
        </a>
        <Button
          type="text"
          size="large"
          className={styles.github}
          onClick={handleThemeChange}
          icon={isDarkMode() ? <SunOutlined /> : <MoonOutlined />}
          draggable={false}
        />
      </Flex>
      <Anchor
        direction="horizontal"
        items={anchorItems}
        className={styles.anchor}
        targetOffset={headerHeight}
      />
      {imageError ? (
        <Tooltip title="Loading..." className={styles.avatar}>
          <Skeleton.Avatar active shape="square" />
        </Tooltip>
      ) : (
        <Avatar
          shape="square"
          className={styles.avatar}
          src={picture}
          draggable={false}
          onError={() => {
            setImageError(true);
            return false;
          }}
        />
      )}
    </AntHeader>
  );
};
