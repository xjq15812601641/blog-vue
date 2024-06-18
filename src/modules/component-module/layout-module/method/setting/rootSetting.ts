import { computed } from "vue";
import { BlogConfigStore } from "/@/modules/store-module/variable/storeVariable";
import { RootSetting } from "/@/modules/component-module/layout-module/variable/layoutVariable";

export function useRootSetting() {
  const appStore = BlogConfigStore;

  /* 设置按钮位置 固定顶部 */
  const getSettingButtonPosition = 'header';
  /* 是否使用错误处理  */
  const getUseErrorHandle = false;
  /* 是否展示页脚 */
  const getShowFooter = false;
  /* 是否显示面包屑图标 */
  const getShowBreadCrumbIcon = false;
  /* 是否使用色弱模式 */
  const getColorWeak = computed(() => appStore.getAppConfig.color_weak);
  /* 展示主题切换 */
  const getShowDarkModeToggle = true;
  /* 加载页面是否使用loading */
  const getPageLoading = computed(() => appStore.getPageLoadingState);

  /* 是否开启缓存 */
  const getOpenKeepAlive = computed(() => appStore.getAppConfig.keepAlive);

  /* 是否支持iframe */
  const getCanEmbedIFramePage = computed(() => appStore.getAppConfig.EmbedIFramePage);

  /* 是否展示logo */
  const getShowLogo = computed(() => appStore.getAppConfig.showLogo);

  /* 是否展示回到顶部 */
  const getUseOpenBackTop = computed(() => appStore.getAppConfig.top_navigation_bar);

  /* 是否展示设置按钮 */
  const getShowSettingButton = computed(() => appStore.getAppConfig.settingButton);

  /* 是否展示面包屑 */
  const getShowBreadCrumb = computed(() => appStore.getAppConfig.showBreadCrumb);

  /* 是否全屏 */
  const getFullContent = computed(() => appStore.getAppConfig.fullContent);

  /* 是否是灰色模式 */
  const getGrayMode = computed(() => appStore.getAppConfig.mode_gray);

  /* 锁屏时间 */
  const getLockTime = computed(() => appStore.getAppConfig.lockTime);

  /* 获取当前主题 */
  const currentTheme = computed(() => appStore.getAppConfig.background);

  /* 获取是否开启canvas */
  const getCanvas = computed(() => appStore.getAppConfig.canvas);

  /* 注入store */
  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting);
  }

  return {
    setRootSetting,
    getSettingButtonPosition,
    getFullContent,
    getColorWeak,
    getGrayMode,
    getPageLoading,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getShowLogo,
    getUseErrorHandle,
    getShowBreadCrumb,
    getShowBreadCrumbIcon,
    getUseOpenBackTop,
    getShowSettingButton,
    getShowFooter,
    getLockTime,
    getShowDarkModeToggle,
    currentTheme,
    getCanvas,
  };
}




















// export class RootSetting {
//   getSettingButtonPosition: string;
//   getUseErrorHandle: boolean;
//   getShowFooter: boolean;
//   getShowBreadCrumbIcon: boolean;
//   getShowDarkModeToggle: boolean;
//   getColorWeak: Ref<boolean>;
//   getPageLoading: Ref<boolean>;
//   getOpenKeepAlive: Ref<boolean>;
//   getCanEmbedIFramePage: Ref<boolean>;
//   getShowLogo: Ref<boolean>;
//   getUseOpenBackTop: Ref<boolean>;
//   getShowSettingButton: Ref<boolean>;
//   getShowBreadCrumb: Ref<boolean>;
//   getFullContent: Ref<boolean>;
//   getGrayMode: Ref<boolean>;
//   getLockTime: Ref<number>;
//   background: Ref<BackgroundEnum>;
//   getCanvas: Ref<boolean>;
//
//   constructor() {
//     /* 设置按钮位置 固定顶部 */
//     this.getSettingButtonPosition = 'header';
//     /* 是否使用错误处理  */
//     this.getUseErrorHandle = false;
//     /* 是否展示页脚 */
//     this.getShowFooter = false;
//     /* 是否显示面包屑图标 */
//     this.getShowBreadCrumbIcon = false;
//     /* 展示主题切换 */
//     this.getShowDarkModeToggle = true;
//     /* 是否使用色弱模式 */
//     this.getColorWeak = computed(() => BlogConfigStore.getAppConfig.color_weak);
//     /* 加载页面是否使用loading */
//     this.getPageLoading = computed(() => BlogConfigStore.getPageLoadingState);
//     /* 是否开启缓存 */
//     this.getOpenKeepAlive = computed(() => BlogConfigStore.getAppConfig.keepAlive);
//     /* 是否支持iframe */
//     this.getCanEmbedIFramePage = computed(() => BlogConfigStore.getAppConfig.EmbedIFramePage);
//     /* 是否展示logo */
//     this.getShowLogo = computed(() => BlogConfigStore.getAppConfig.showLogo);
//     /* 是否展示回到顶部 */
//     this.getUseOpenBackTop = computed(() => BlogConfigStore.getAppConfig.top_navigation_bar);
//     /* 是否展示设置按钮 */
//     this.getShowSettingButton = computed(() => BlogConfigStore.getAppConfig.settingButton);
//     /* 是否展示面包屑 */
//     this.getShowBreadCrumb = computed(() => BlogConfigStore.getAppConfig.showBreadCrumb);
//     /* 是否全屏 */
//     this.getFullContent = computed(() => BlogConfigStore.getAppConfig.fullContent);
//     /* 是否是灰色模式 */
//     this.getGrayMode = computed(() => BlogConfigStore.getAppConfig.mode_gray);
//     /* 锁屏时间 */
//     this.getLockTime = computed(() => BlogConfigStore.getAppConfig.lockTime);
//     /* 获取当前主题 */
//     this.background = computed(() => BlogConfigStore.getAppConfig.background);
//     /* 获取是否开启canvas */
//     this.getCanvas = computed(() => BlogConfigStore.getAppConfig.canvas);
//   }
//
//   /* 注入store */
//   setRootSetting(setting: Partial<ConfigOption>) {
//     BlogConfigStore.setProjectConfig(setting);
//   }
//
// }
