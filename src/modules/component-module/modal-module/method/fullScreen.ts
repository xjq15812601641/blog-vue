import {
  UseFullScreenContext
} from "/@/modules/component-module/modal-module/interface/UseFullScreenContext";
import { computed, ref, Ref, unref } from "vue";

export class FullScreen {
  context: UseFullScreenContext;
  fullScreenRef: Ref<boolean>;
  constructor(context: UseFullScreenContext) {
    this.context = context;
    this.fullScreenRef = ref(false);
  }
  getWrapClassName() {
    return computed(() => {
      const clsName = unref(this.context.wrapClassName) || '';
      return unref(this.fullScreenRef) ? `fullscreen-modal ${clsName} ` : unref(clsName);
    })
  }
  handleFullScreen(e: Event) {
    e && e.stopPropagation();
    this.fullScreenRef.value = !unref(this.fullScreenRef);

    // const modalWrapper = unref(context.modalWrapperRef);

    // if (!modalWrapper) return;

    // const wrapperEl = modalWrapper.$el as HTMLElement;
    // if (!wrapperEl) return;
    // const modalWrapSpinEl = wrapperEl.querySelector('.ant-spin-nested-loading') as HTMLElement;

    // if (!modalWrapSpinEl) return;

    // if (!unref(formerHeightRef) && unref(fullScreenRef)) {
    //   formerHeightRef.value = modalWrapSpinEl.offsetHeight;
    // }

    // if (unref(fullScreenRef)) {
    //   modalWrapSpinEl.style.height = `${window.innerHeight - unref(context.extHeightRef)}px`;
    // } else {
    //   modalWrapSpinEl.style.height = `${unref(formerHeightRef)}px`;
    // }
  }

}
