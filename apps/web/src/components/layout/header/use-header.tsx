import LogoSvg from "~/assets/svgs/logo.svg?react";
import { useUser } from "~/providers/user";

export const useHeader = () => {
  const { profile, isDarkMode, updateTheme } = useUser();
  const picture = profile?.picture;

  const handleThemeChange = () => {
    updateTheme(isDarkMode() ? "light" : "dark");
  };

  const anchorItems = [
    {
      key: "hero",
      title: (
        <LogoSvg
          style={{
            height: "100%",
            width: "min-content",
            fill: isDarkMode() ? "#ffffff" : "#000000",
            transition: "fill 0.3s ease",
          }}
        />
      ),
      href: "/#hero",
    },
    { key: "about", title: "About", href: "/#about" },
    { key: "faq", title: "FAQ", href: "/#faq" },
    { key: "contact", title: "Contact", href: "/#contact" },
  ];

  return { picture, anchorItems, handleThemeChange, isDarkMode };
};
