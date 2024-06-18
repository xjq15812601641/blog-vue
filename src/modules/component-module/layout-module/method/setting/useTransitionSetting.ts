import { computed } from "vue";
import { BlogConfigStore } from "/@/modules/store-module/variable/storeVariable";
import { TransitionSetting } from "/#/config";

export function useTransitionSetting() {
  /* 是否启用动画 */
  const getEnableTransition = computed(() => BlogConfigStore.getTransitionSetting?.enable);

  /* 是否开启进程条 */
  const getOpenNProgress = computed(() => BlogConfigStore.getTransitionSetting?.openNProgress);

  /* 加载页面是否展示loading效果 */
  const getOpenPageLoading = computed((): boolean => {
    return !!BlogConfigStore.getTransitionSetting?.openPageLoading;
  });

  /* 获取动画形式 */
  const getBasicTransition = computed(() => BlogConfigStore.getTransitionSetting?.basicTransition);

  /* 注入store */
  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    BlogConfigStore.setProjectConfig({ transitionSetting });
  }
  return {
    setTransitionSetting,
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}
