import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { Line } from "~/components/common/drop-indicator/drop-indicator-line";

export interface DropIndicatorProps {
  edge: Edge;
  gap?: string;
  indent?: string;
  divider: boolean;
}

export const DropIndicator = ({ edge, gap, indent, divider }: DropIndicatorProps) => {
  return <Line edge={edge} gap={gap} indent={indent} divider={divider} />;
};
