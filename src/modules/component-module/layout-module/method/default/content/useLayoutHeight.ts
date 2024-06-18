import {
  footerHeightRef,
  headerHeightRef
} from "/@/modules/component-module/layout-module/variable/layoutVariable";

export function useLayoutHeight() {
  function setHeaderHeight(val) {
    headerHeightRef.value = val;
  }
  function setFooterHeight(val) {
    footerHeightRef.value = val;
  }
  return { headerHeightRef, footerHeightRef, setHeaderHeight, setFooterHeight };
}
