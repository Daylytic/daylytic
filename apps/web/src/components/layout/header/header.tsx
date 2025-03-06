import { Header as AntHeader } from "antd/es/layout/layout";
import { Anchor, Avatar, Skeleton, Tooltip } from "antd";
import styles from "./header.module.css";
import Logo from "assets/svgs/logo.svg";
import { useUser } from "providers/user";

const anchorItems = [
  {
    key: "hero",
    title: <img src={Logo} height="100%" className={styles["header-img"]} alt="Logo" />,
    href: "/#hero",
  },
  { key: "about", title: "About", href: "/#about" },
  { key: "faq", title: "FAQ", href: "/#faq" },
  { key: "contact", title: "Contact", href: "/#contact" },
];

export const Header: React.FC = () => {
  const { profile, fetched, token } = useUser();
  const picture = profile?.picture;

  const avatarContent = !token ? null : fetched ? (
    profile ? (
      <img src={picture} alt="avatar" className={styles["avatar-img"]} loading="lazy" />
    ) : null
  ) : (
    <Tooltip title="Logging in...">
      <Skeleton.Avatar active />
    </Tooltip>
  );

  return (
    <AntHeader id={styles.header}>
      <Anchor direction="horizontal" items={anchorItems} className={styles.anchor} />
      <Avatar className={styles.avatar}>{avatarContent}</Avatar>
    </AntHeader>
  );
};
