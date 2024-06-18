import { unref } from 'vue';
import { BlogConfigStore } from '/@/modules/store-module/variable/storeVariable';

export function handleRestoreState(isSetState) {
  if (unref(isSetState)) {
    isSetState.value = false;
    const { menuMode, menuCollapsed, menuType, menuSplit } = BlogConfigStore.getBeforeMiniInfo;
    BlogConfigStore.setProjectConfig({
      menuSetting: {
        type: menuType,
        mode: menuMode,
        collapsed: menuCollapsed,
        split: menuSplit,
      },
    });
  }
}
