import { UseEventParams } from '/@/modules/window-module/interface/UseEventParams';
import { RemoveEventFn } from '/@/modules/window-module/variable/windowVariable';
import { Ref, ref, unref, watch } from 'vue';
import { useDebounceFn, useThrottleFn } from '@vueuse/shared';
import { removeEventListener } from '/@/modules/window-module/method/removeEventListener';

export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80,
}: UseEventParams): { removeEvent: RemoveEventFn } {
  // removeEvent 函数，用于手动移除事件监听器
  /* eslint-disable-next-line */
  let remove: RemoveEventFn = () => {};
  const isAddRef = ref(false);

  if (el) {
    //第一个ref是创建响应式，第二个Ref可以通过element.value访问Element类型的值
    const element = ref(el as Element) as Ref<Element>;
    //防抖Debounce冷却后才能再次调用，节流Throttle一段时间区间内只能使用一次
    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait);
    const realHandler = wait ? handler : listener;
    const removeWatch = watch(
      element,
      (v, _ov, cleanUp) => {
        if (v) {
          !unref(isAddRef) && v.addEventListener(name, realHandler, options);
          cleanUp(() => {
            autoRemove && removeEventListener(isAddRef, v, name, handler, options);
          });
        }
      },
      { immediate: true },
    );

    remove = () => {
      removeEventListener(isAddRef, element.value, name, handler, options);
      removeWatch();
    };
  }
  return { removeEvent: remove };
}
