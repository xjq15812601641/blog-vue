import { isFunction } from "/@/utils/is/is";
import { useTimeoutRef } from "/@/modules/blogComp-module/method/useTimeoutRef";
import { watch } from "vue";

export function useTimeoutFn(handle: Fn<any>, wait: number, native = false) {
  if (!isFunction(handle)) {
    throw new Error('handle is not Function!');
  }

  const { readyRef, stop, start } = useTimeoutRef(wait);
  if (native) {
    handle();
  } else {
    watch(
      readyRef,
      (maturity) => {
        maturity && handle();
      },
      { immediate: false },
    );
  }
  return { readyRef, stop, start };
}
