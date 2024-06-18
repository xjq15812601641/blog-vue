import { ref, unref } from "vue";
import { position } from "/@/modules/scroll-moduole/method/position";
import { isFunction, isUnDef } from "/@/utils/is/is";
import { easeInOutQuad } from "/@/modules/scroll-moduole/method/easeInOutQuad";
import { move } from "/@/modules/scroll-moduole/method/move";
import { ScrollToParams } from "/@/modules/scroll-moduole/interface/scrollToParams";

export function useScrollTo({ el, to, duration = 500, callback }: ScrollToParams) {
  const isActiveRef = ref(false);
  const start = position(el);
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  duration = isUnDef(duration) ? 500 : duration;

  const animateScroll = function () {
    if (!unref(isActiveRef)) {
      return;
    }
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    move(el, val);
    if (currentTime < duration && unref(isActiveRef)) {
      requestAnimationFrame(animateScroll);
    } else {
      if (callback && isFunction(callback)) {
        callback();
      }
    }
  };
  const run = () => {
    isActiveRef.value = true;
    animateScroll();
  };

  const stop = () => {
    isActiveRef.value = false;
  };

  return { start: run, stop };
}
