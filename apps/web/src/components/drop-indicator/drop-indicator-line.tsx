import React from 'react';
import type { CSSProperties } from 'react';
import styles from './drop-indicator.module.css';

import type { Edge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/types';

type Orientation = 'horizontal' | 'vertical';

const edgeToOrientationMap: Record<Edge, Orientation> = {
  top: 'horizontal',
  bottom: 'horizontal',
  left: 'vertical',
  right: 'vertical',
};

export function Line({
  edge,
  gap = '0px',
  indent = '0px',
  strokeColor = "var(--ant-color-primary)",
  strokeWidth = "1px",
}: {
  edge: Edge;
  indent?: string;
  gap?: string;
  strokeColor?: string;
  strokeWidth?: string;
}) {
  const orientation = edgeToOrientationMap[edge];
  const className = `${styles.root} ${styles[orientation]} ${styles[edge]}`;

  const style: CSSProperties = {
    '--stroke-color': strokeColor,
    '--stroke-width': strokeWidth,
    '--main-axis-offset': `calc(-0.5 * (${gap} + var(--stroke-width)))`,
    '--line-main-axis-start': indent,
  } as CSSProperties;

  return <div className={className} style={style} />;
}

export default Line;
