import { isServer } from "/@/utils/is/is";
import { resizeHandler } from "/@/modules/component-module/scrollbar-module/method/resizeHandler";

export function addResizeListener(element: any, fn: () => any) {
  if (isServer) return;
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver(resizeHandler);
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
}
