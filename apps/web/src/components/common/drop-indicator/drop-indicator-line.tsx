import styles from "./drop-indicator.module.css";
import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";
import { theme } from "antd";

const { useToken } = theme;

type Orientation = "horizontal" | "vertical";

interface LineProps {
  edge: Edge;
  indent?: string;
  gap?: string;
  strokeColor?: string;
  strokeWidth?: string;
  divider: boolean;
}

const edgeToOrientationMap: Record<Edge, Orientation> = {
  top: "horizontal",
  bottom: "horizontal",
  left: "vertical",
  right: "vertical",
};

export const Line = ({
  edge,
  indent = "0px",
  gap,
  strokeColor = "var(--ant-color-primary)",
  strokeWidth = "var(--ant-line-width)",
  divider,
}: LineProps) => {
  const { token } = useToken();
  const orientation = edgeToOrientationMap[edge];

  const className = `${styles.root} ${styles[orientation]} ${styles[edge]} .css-var-r1`;

  const dividerAxis = divider
    ? "calc(var(--stroke-width) + (var(--ant-line-width) * 2))"
    : "calc(var(--stroke-width) * 2)";
  const gapAxis = gap ?? `${token.paddingXS * (divider ? 2 : 1)}px`;

  const style: React.CSSProperties & Record<string, string> = {
    "--stroke-color": strokeColor,
    "--stroke-width": strokeWidth,
    "--main-axis-offset": `calc(-0.5 * (${gapAxis} + ${dividerAxis}))`,
    "--line-main-axis-start": indent,
  };

  return <div className={className} style={style} />;
}