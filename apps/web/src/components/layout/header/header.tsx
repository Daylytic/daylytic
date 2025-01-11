import { Header as AntHeader } from "antd/es/layout/layout";

import styles from "./header.module.css";
import { Anchor, Avatar } from "antd";
import Logo from "assets/svgs/logo.svg";
import { useUser } from "providers/user";

const anchoritems = [
  {
    key: "hero",
    title: <img src={Logo} height="100%" id={styles["header-img"]}></img>,
    href: "/#hero",
  },
  { key: "about", title: "About", href: "/#about" },
  { key: "faq", title: "FAQ", href: "/#faq" },
  { key: "contact", title: "Contact", href: "/#contact" },
];

export const Header = () => {
  const user = useUser();
  const picture = user.profile?.picture;

  return (
    <AntHeader id={styles.header}>
      <Anchor
        direction="horizontal"
        items={anchoritems}
        className={styles.anchor}
      />

      <Avatar
        className={styles.avatar}
        src={
          picture && (
            <img
              src={picture}
              alt="avatar"
              id={styles["avatar-img"]}
              loading="lazy"
            />
          )
        }
      ></Avatar>
    </AntHeader>
  );
};
