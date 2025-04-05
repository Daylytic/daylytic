import { ReactNode } from "react";
import { Content as AntContent } from "antd/es/layout/layout";
import clsx from "clsx";
import { styles } from ".";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

interface ContentProps {
  children: ReactNode[];
  className?: string;
}

export const Content = ({ children, className }: ContentProps) => {
  const screens = useBreakpoint();
  const isMobile = !screens.lg;
  return (
    <AntContent className={clsx(className, isMobile && styles.mobile, styles.content)} data-tour-id="content">
      {children}
    </AntContent>
  );
};
