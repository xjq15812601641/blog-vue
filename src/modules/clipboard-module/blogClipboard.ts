import { ref, watch } from "vue";
import { isDef } from "/@/utils/is/is";
import { copyTextToClipboard } from "/@/modules/clipboard-module/method/copyTextToClipboard";

export class BlogClipboard {
  static useCopyToClipboard(initial?: string) {
    const clipboardRef = ref(initial || '');
    const isSuccessRef = ref(false);
    const copiedRef = ref(false);

    watch(
      clipboardRef,
      (str?: string) => {
        if (isDef(str)) {
          copiedRef.value = true;
          isSuccessRef.value = copyTextToClipboard(str);
        }
      },
      { immediate: !!initial, flush: 'sync' },
    );

    return { clipboardRef, isSuccessRef, copiedRef };
  }
}
