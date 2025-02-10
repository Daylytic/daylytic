/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const VERTICAL_GAP = 10;
const HORIZONTAL_OFFSET = 0;

export function setFloatingElemPositionForLinkEditor(
    targetRect: DOMRect | null,
    floatingElem: HTMLElement,
    anchorElem: HTMLElement,
    isLink: boolean | undefined,
    verticalGap: number = VERTICAL_GAP,
    horizontalOffset: number = HORIZONTAL_OFFSET,
    horizontalMargin: number = 24  // added margin value (in pixels)
): void {
    const scrollerElem = anchorElem;

    if (targetRect === null || !scrollerElem) {
        floatingElem.style.display = 'none';
        floatingElem.style.opacity = '0';
        floatingElem.style.transform = 'translate(-10000px, -10000px)';
        return;
    }

    if (!isLink) {
        floatingElem.style.display = 'none';
        return;
    }

    floatingElem.style.display = 'flex';

    const floatingElemRect = floatingElem.getBoundingClientRect();
    const anchorElementRect = anchorElem.getBoundingClientRect();
    const editorScrollerRect = scrollerElem.getBoundingClientRect();

    console.log([scrollerElem])

    // Calculate initial positions
    let top = targetRect.top - verticalGap;
    let left = targetRect.left - horizontalOffset;

    // Adjust vertical position if popover would appear above the scroller
    if (top < editorScrollerRect.top) {
        top += floatingElemRect.height + targetRect.height + verticalGap * 2;
    }

    // Ensure the popover does not extend past the right edge, leaving margin space
    if (left + floatingElemRect.width > editorScrollerRect.right - horizontalMargin) {
        left = editorScrollerRect.right - floatingElemRect.width - horizontalOffset - horizontalMargin;
    }

    // Similarly, if the popover is too far left, keep a margin on the left edge
    if (left < editorScrollerRect.left + horizontalMargin) {
        left = editorScrollerRect.left + horizontalMargin;
    }

    // Adjust relative to the anchor element
    top -= anchorElementRect.top;
    left -= anchorElementRect.left;

    floatingElem.style.opacity = '1';
    floatingElem.style.transform = `translate(${left}px, ${top}px)`;
}
