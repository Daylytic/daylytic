/**
 * Runs a flash animation on the background color of the provided `element`.
 *
 * This animation should be used after an element has been reordered,
 * in order to highlight where the element has moved to.
 */
export function triggerPostMoveFlash(element: HTMLElement) {

  const computedStyles = getComputedStyle(element);

  const backgroundColor = computedStyles.getPropertyValue("--ant-color-primary-bg").trim();
  const duration = computedStyles.getPropertyValue("--ant-motion-duration-slow").trim();
  const easing = computedStyles.getPropertyValue("--ant-motion-ease-out-quint").trim();

  // Convert the duration to milliseconds if it's in a different unit
  const durationMs = (parseFloat(duration) * 1000) * 2;

  element.animate([{ backgroundColor: backgroundColor }, {}], {
    duration: durationMs,
    easing: easing,
    iterations: 1,
  });
}
