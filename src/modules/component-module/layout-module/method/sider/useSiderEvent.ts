import { computed, ref, unref } from "vue";
import { SIDE_BAR_MINI_WIDTH } from "/@/modules/menuConfig-module/variable/menuVariable";
// 处理菜单事件的相关操作
export function useSiderEvent() {
  const brokenRef = ref(false);

  const getCollapsedWidth = computed(() => {
    return unref(brokenRef) ? 0 : SIDE_BAR_MINI_WIDTH;
  });

  function onBreakpointChange(broken: boolean) {
    brokenRef.value = broken;
  }

  return { getCollapsedWidth, onBreakpointChange };
}
