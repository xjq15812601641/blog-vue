import type { MenuSetting } from '/#/config';

import { computed, unref } from 'vue';

import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';
import { useFullContent } from "/@/modules/menuConfig-module/method/useFullContent";
import {
  mixSideHasChildren,
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH
} from "/@/modules/menuConfig-module/variable/menuVariable";
import { BlogConfigStore } from "/@/modules/store-module/variable/storeVariable";


/* type和mode一起决定了菜单最终模式
 * 菜单模式:  左侧菜单模式     顶部菜单      左侧菜单混合模式    顶部菜单混合模式
 *    type:     sidebar      horizontal        mix-sidebar       horizontal
 *    mode:     inline       top-menu          inline              mix
 */


export function useMenuSetting() {
  /* 是否设置为全屏内容 */
  const { getFullContent: fullContent } = useFullContent();

  const appStore = BlogConfigStore;
  /* 是否展示左侧菜单 */
  const getShowSidebar = computed(() => {
    return (
      unref(getSplit) ||
      (unref(getShowMenu) && unref(getMenuMode) !== MenuModeEnum.horizontal && !unref(fullContent))
    );
  });

  /* 是否折叠菜单 */
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  /* type和mode一起决定了菜单最终模式
   * 菜单模式:  左侧菜单模式     顶部菜单      左侧菜单混合模式    顶部菜单混合模式
   *    type:     sidebar      horizontal        mix-sidebar       horizontal
   *    mode:     inline       top-menu          inline              mix
   */
  /* 类型*/
  const getMenuType = computed(() => appStore.getMenuSetting.type);

  /* 模式 顶部菜单模式 HORIZONTAL 其余均为inline */
  const getMenuMode = computed(() => appStore.getMenuSetting.mode);

  /* 仅针对菜单在左侧的情况 菜单是否随右侧内容滑动 */
  const getMenuFixed = computed(() => appStore.getMenuSetting.fixed); // 默认true

  /* 左侧菜单是否展示 */
  const getShowMenu = computed(() => appStore.getMenuSetting.show);

  /* 菜单是否隐藏 */
  const getMenuHidden = computed(() => appStore.getMenuSetting.hidden);

  /* 获取菜单宽度 */
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);

  /* 菜单折叠图标的位置 */
  const getTrigger = computed(() => appStore.getMenuSetting.trigger);

  /* 仅针对顶部混合模式菜单 */
  /* 菜单分割 1级菜单(顶栏)与子级菜单(侧边栏)分割 */
  const getSplit = computed(() => appStore.getMenuSetting.split);

  // /* 固定展开菜单 只针对左侧混合菜单 */
  const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed);

  /* 是否是左侧菜单 */
  const getIsSidebarType = computed(() => unref(getMenuType) === MenuTypeEnum.leftMenu);

  /* 是否是顶部菜单 */
  const getIsTopMenu = computed(() => unref(getMenuType) === MenuTypeEnum.topMenu);

  /* 是否展示顶部菜单 顶部菜单模式或混合模式下分割菜单则为true */
  const getShowTopMenu = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.horizontal || unref(getSplit);
  });

  /* 触发收缩菜单的按钮是否在顶部 */
  const getShowHeaderTrigger = computed(() => {
    if (
      /* 顶部菜单 或 展示左侧菜单 */
      unref(getMenuType) === MenuTypeEnum.topMenu ||
      !unref(getShowMenu) ||
      unref(getMenuHidden)
    ) {
      return false;
    }

    return unref(getTrigger) === TriggerEnum.topShow;
  });

  /* 是否是顶部菜单模式 */
  const getIsHorizontal = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.horizontal;
  });

  /* 是否是左侧混合菜单模式 */
  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.leftMixMenu;
  });

  /* 是否是顶部混合菜单模式 */
  const getIsMixMode = computed(() => {
    return unref(getMenuMode) === MenuModeEnum.inline && unref(getMenuType) === MenuTypeEnum.topMixMenu;
  });

  /* 获取左侧菜单宽度 number类型*/
  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed)
        ? unref(getMiniWidthNumber)
        : unref(getMenuWidth);
    }
    return unref(getCollapsed) ? unref(getMiniWidthNumber) : unref(getMenuWidth);
  });

  /* 获取菜单宽度实现 */
  const getMiniWidthNumber = computed(() => {
    const { collapsedShowTitle } = appStore.getMenuSetting;
    /* collapsedShowTitle：折叠菜单是否显示名称 */
    return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH;
  });

  /* 内容宽度 */
  const getCalcContentWidth = computed(() => {
    const width =
      unref(getIsTopMenu) || !unref(getShowMenu) || (unref(getSplit) && unref(getMenuHidden))
        ? 0
        : unref(getIsMixSidebar)
          ? (unref(getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
          (unref(getMixSideFixed) && unref(mixSideHasChildren) ? unref(getRealWidth) : 0)
          : unref(getRealWidth);
    return `calc(100% - ${unref(width)}px)`;
  });

  // Set menu configuration
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  /* 展开与收缩切换后重置菜单配置 */
  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    setMenuSetting,
    toggleCollapsed,
    getMenuFixed, // false
    getRealWidth,
    getMenuType,
    getMenuMode,
    getShowMenu,
    getCollapsed,
    getCalcContentWidth,
    getMenuWidth,
    getTrigger,
    getSplit,
    getIsHorizontal,
    getIsSidebarType,
    getShowTopMenu,
    getShowHeaderTrigger,
    getMenuHidden,
    getIsTopMenu,
    getShowSidebar,
    getIsMixMode,
    getIsMixSidebar,
    mixSideHasChildren,
  };
}


























// export class MenuConfig {
//   getFullContent: Ref<boolean>;
//   getSplit: Ref<boolean>;
//   getShowSidebar: Ref<boolean>;
//   getShowMenu: Ref<boolean>;
//   getMenuMode: Ref<MenuModeEnum>;
//   getCollapsed: Ref<boolean>;
//   getMenuType: Ref<MenuTypeEnum>;
//   getMenuFixed: Ref<boolean>;
//   getMenuHidden: Ref<boolean>;
//   getMenuWidth: Ref<number>;
//   getTrigger: Ref<TriggerEnum>;
//   getMixSideFixed: Ref<boolean>;
//   getIsSidebarType: Ref<boolean>;
//   getIsTopMenu: Ref<boolean>;
//   getShowTopMenu: Ref<boolean>;
//   getShowHeaderTrigger: Ref<boolean>;
//   getIsHorizontal: Ref<boolean>;
//   getIsMixSidebar: Ref<boolean>;
//   getIsMixMode: Ref<boolean>;
//   getMiniWidthNumber:Ref<number>;
//   getRealWidth: Ref<number>;
//   getCalcContentWidth: Ref<string>;
//   constructor() {
//     const { getFullContent } = useFullContent();
//     /* 是否设置为全屏内容 */
//     this.getFullContent = getFullContent;
//     /* 仅针对顶部混合模式菜单 */
//     /* 菜单分割 1级菜单(顶栏)与子级菜单(侧边栏)分割 */
//     this.getSplit = computed(() => menu_appStore.getMenuSetting.split);
//     /* 是否展示左侧菜单 */
//     this.getShowMenu = computed(() => menu_appStore.getMenuSetting.show);
//     /* 左侧菜单是否展示 */
//     this.getMenuMode = computed(() => menu_appStore.getMenuSetting.mode);
//     /* 模式 顶部菜单模式 HORIZONTAL 其余均为inline */
//     this.getShowSidebar = computed(() => {
//       return (
//         unref(this.getSplit) ||
//         (unref(this.getShowMenu) && unref(this.getMenuMode) !== MenuModeEnum.horizontal && !unref(this.getFullContent))
//       );
//     });
//     /* 类型*/
//     this.getCollapsed = computed(() => menu_appStore.getMenuSetting.collapsed);
//     /* 是否折叠菜单 */
//     this.getMenuType = computed(() => menu_appStore.getMenuSetting.type);
//     /* 仅针对菜单在左侧的情况 菜单是否随右侧内容滑动 */
//     this.getMenuFixed = computed(() => menu_appStore.getMenuSetting.fixed); // 默认true
//     /* 菜单是否隐藏 */
//     this.getMenuHidden = computed(() => menu_appStore.getMenuSetting.hidden);
//     /* 获取菜单宽度 */
//     this.getMenuWidth = computed(() => menu_appStore.getMenuSetting.menuWidth);
//     /* 菜单折叠图标的位置 */
//     this.getTrigger = computed(() => menu_appStore.getMenuSetting.trigger);
//     /* 固定展开菜单 只针对左侧混合菜单 */
//     this.getMixSideFixed = computed(() => menu_appStore.getMenuSetting.mixSideFixed);
//     /* 是否是左侧菜单 */
//     this.getIsSidebarType = computed(() => unref(this.getMenuType) === MenuTypeEnum.leftMenu);
//     /* 是否是顶部菜单 */
//     this.getIsTopMenu = computed(() => unref(this.getMenuType) === MenuTypeEnum.topMenu);
//     /* 是否展示顶部菜单 顶部菜单模式或混合模式下分割菜单则为true */
//     this.getShowTopMenu = computed(() => {
//       return unref(this.getMenuMode) === MenuModeEnum.horizontal || unref(this.getSplit);
//     });
//     /* 触发收缩菜单的按钮是否在顶部 */
//     this.getShowHeaderTrigger = computed(() => {
//       if (
//         /* 顶部菜单 或 展示左侧菜单 */
//         unref(this.getMenuType) === MenuTypeEnum.topMenu ||
//         !unref(this.getShowMenu) ||
//         unref(this.getMenuHidden)
//       ) {
//         return false;
//       }
//
//       return unref(this.getTrigger) === TriggerEnum.topShow;
//     });
//     /* 是否是顶部菜单模式 */
//     this.getIsHorizontal = computed(() => {
//       return unref(this.getMenuMode) === MenuModeEnum.horizontal;
//     });
//     /* 是否是左侧混合菜单模式 */
//     this.getIsMixSidebar = computed(() => {
//       return unref(this.getMenuType) === MenuTypeEnum.leftMixMenu;
//     });
//     /* 是否是顶部混合菜单模式 */
//     this.getIsMixMode = computed(() => {
//       return unref(this.getMenuMode) === MenuModeEnum.inline && unref(this.getMenuType) === MenuTypeEnum.topMixMenu;
//     });
//     /* 获取菜单宽度实现 */
//     this.getMiniWidthNumber = computed(() => {
//       const { collapsedShowTitle } = menu_appStore.getMenuSetting;
//       /* collapsedShowTitle：折叠菜单是否显示名称 */
//       return collapsedShowTitle ? SIDE_BAR_SHOW_TIT_MINI_WIDTH : SIDE_BAR_MINI_WIDTH;
//     });
//     /* 获取左侧菜单宽度 number类型*/
//     this.getRealWidth = computed(() => {
//       if (unref(this.getIsMixSidebar)) {
//         return unref(this.getCollapsed) && !unref(this.getMixSideFixed)
//           ? unref(this.getMiniWidthNumber)
//           : unref(this.getMenuWidth);
//       }
//       return unref(this.getCollapsed) ? unref(this.getMiniWidthNumber) : unref(this.getMenuWidth);
//     });
//     /* 内容宽度 */
//     this.getCalcContentWidth = computed(() => {
//       const width =
//         unref(this.getIsTopMenu) || !unref(this.getShowMenu) || (unref(this.getSplit) && unref(this.getMenuHidden))
//           ? 0
//           : unref(this.getIsMixSidebar)
//             ? (unref(this.getCollapsed) ? SIDE_BAR_MINI_WIDTH : SIDE_BAR_SHOW_TIT_MINI_WIDTH) +
//             (unref(this.getMixSideFixed) && unref(mixSideHasChildren) ? unref(this.getRealWidth) : 0)
//             : unref(this.getRealWidth);
//       return `calc(100% - ${unref(width)}px)`;
//     });
//
//
//   }
//   // 设置菜单配置
//   setMenuSetting(menuSetting: Partial<MenuSetting>): void {
//     menu_appStore.setProjectConfig({ menuSetting });
//   }
//   /* 展开与收缩切换后重置菜单配置 */
//   toggleCollapsed() {
//     this.setMenuSetting({
//       collapsed: !unref(this.getCollapsed),
//     });
//   }
//
// }

