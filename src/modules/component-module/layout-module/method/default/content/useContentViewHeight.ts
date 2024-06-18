import { computed, ref, unref } from "vue";
import { useWindowSizeFn } from "/@/modules/window-module/method/useWindowSizeFn";
import {
  footerHeightRef,
  headerHeightRef
} from "/@/modules/component-module/layout-module/variable/layoutVariable";
import {
  createPageContext
} from "/@/modules/component-module/layout-module/method/default/content/createPageContext";

export function useContentViewHeight() {
  const contentHeight = ref(window.innerHeight);
  const pageHeight = ref(window.innerHeight);
  const getViewHeight = computed(() => {
    return unref(contentHeight) - unref(headerHeightRef) - unref(footerHeightRef) || 0;
  });

  useWindowSizeFn(
    () => {
      contentHeight.value = window.innerHeight;
    },
    100,
    { immediate: true },
  );

  async function setPageHeight(height: number) {
    pageHeight.value = height;
  }

  createPageContext({
    contentHeight: getViewHeight,
    setPageHeight,
    pageHeight,
  });
}
