import React from 'react';
import type { CSSProperties } from 'react';
import styles from './drop-indicator.module.css';

import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';
import { theme } from 'antd';

type Orientation = 'horizontal' | 'vertical';

const { useToken } = theme;

const edgeToOrientationMap: Record<Edge, Orientation> = {
  top: 'horizontal',
  bottom: 'horizontal',
  left: 'vertical',
  right: 'vertical',
};

export function Line({
  edge,
  gap,
  indent = '0px',
  strokeColor = "var(--ant-color-primary)",
  strokeWidth = "2px",
}: {
  edge: Edge;
  indent?: string;
  gap?: string;
  strokeColor?: string;
  strokeWidth?: string;
}) {
  const { token } = useToken();
  const orientation = edgeToOrientationMap[edge];
  const className = `${styles.root} ${styles[orientation]} ${styles[edge]} .css-var-r1 `;

  const style: CSSProperties = {
    '--stroke-color': strokeColor,
    '--stroke-width': strokeWidth,
    '--main-axis-offset': `calc(-0.5 * (${gap ?? token.paddingXS.toString() + "px"} + var(--stroke-width)))`,
    '--line-main-axis-start': indent,
  } as CSSProperties;

  return <div className={className} style={style} />;
}

export default Line;
