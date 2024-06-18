import { computed, Ref, unref } from "vue";
import { useMenuSetting } from "/@/modules/menuConfig-module/menuConfig";
import { TriggerEnum } from "/@/enums/menuEnum";
// 处理菜单折叠的相关操作
export function useTrigger(getIsMobile: Ref<boolean>) {
  const { getTrigger, getSplit } = useMenuSetting();
  /* HEADER  false */

  const getShowTrigger = computed(() => {
    const trigger = unref(getTrigger);

    return (
      trigger !== TriggerEnum.notShow &&
      !unref(getIsMobile) &&
      (trigger === TriggerEnum.bottomShow || unref(getSplit))
    );
  });

  const getTriggerAttr = computed(() => {
    if (unref(getShowTrigger)) {
      return {};
    }
    return {
      trigger: null,
    };
  });

  return { getTriggerAttr, getShowTrigger };
}
