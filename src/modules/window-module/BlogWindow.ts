import { CreateCallbackParams } from '/@/modules/window-module/interface/CreateCallbackParams';
import { computed, ComputedRef, ref, unref } from 'vue';
import { YardageEnum } from '/@/enums/yardageEnum';
import { getWindowWidth } from '/@/modules/window-module/method/getWindowWidth';
import { useEventListener } from '/@/modules/window-module/method/useEventListener';
import { getYardageValue } from '/@/modules/window-module/variable/windowVariable';
import { ScreenEnum } from '/@/enums/screenEnum';
let globalScreenRef: ComputedRef<YardageEnum | undefined>;
let globalWidthRef: ComputedRef<number>;
let globalRealWidthRef: ComputedRef<number>;
export class BlogWindow {
  static createBreakpointListen(fn?: (opt: CreateCallbackParams) => void) {
    const screenRef = ref<YardageEnum>(YardageEnum.XL);
    const realWidthRef = ref(window.innerWidth);
    useEventListener({
      el: window,
      name: 'resize',
      listener: () => {
        getWindowWidth(screenRef, realWidthRef);
        resizeFn();
      },
    });
    getWindowWidth(screenRef, realWidthRef);
    globalScreenRef = computed(() => unref(screenRef));
    globalWidthRef = computed(
      () => getYardageValue[unref(screenRef)]() || getYardageValue.default(),
    );
    globalRealWidthRef = computed((): number => unref(realWidthRef));
    function resizeFn() {
      fn?.({
        screen: globalScreenRef,
        width: globalWidthRef,
        realWidth: globalRealWidthRef,
        screenEnum: ScreenEnum,
        yardageEnum: YardageEnum,
      });
    }
    resizeFn();
    return {
      screenRef: globalScreenRef,
      widthRef: globalWidthRef,
      realWidthRef: globalRealWidthRef,
      screenEnum: ScreenEnum,
      yardageEnum: YardageEnum,
    };
  }
  static useBreakpoint() {
    return {
      screenRef: computed(() => unref(globalScreenRef)),
      widthRef: globalWidthRef,
      YardageEnum,
      realWidthRef: globalRealWidthRef,
    };
  }

}
