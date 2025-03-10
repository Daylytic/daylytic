import React from 'react';
import {
    Edge,

  } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"; // NEW
import Line from 'components/drop-indicator/drop-indicator-line';

export type DropIndicatorProps = {
	edge: Edge;
	gap?: string;
	indent?: string;
};

export function DropIndicator({
	edge,
	gap,
	indent,
}: DropIndicatorProps) {
	return (
		<Line
			edge={edge}
			gap={gap}
			indent={indent}
		/>
	);
}

// This default export is intended for usage with React.lazy
export default DropIndicator;