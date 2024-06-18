import { Ref } from "vue";

export interface UseFullScreenContext {
  wrapClassName: Ref<string | undefined>;
  modalWrapperRef: Ref<ComponentRef>;
  extHeightRef: Ref<number>;
}
