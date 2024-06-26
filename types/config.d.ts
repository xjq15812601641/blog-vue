import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from "/@/enums/menuEnum";


export interface MenuSetting {
  fixed: boolean;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  show: boolean;
  hidden: boolean;
  menuWidth: number;
  mixSideFixed: boolean;
  collapsed: boolean;
  collapsedShowTitle: boolean;
  trigger: TriggerEnum;
  split: boolean;
}

export interface HeaderSetting {
  show: boolean;
  fixed: boolean;
  showFullScreen: boolean;
  showNotice: boolean;
}

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean;
  // Route basic switching animation
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading
  openPageLoading: boolean;
  // Whether to open the top progress bar
  openNProgress: boolean;
}

export interface ProjectConfig {
  // permissionCacheType: CacheTypeEnum; // default local
  openCanvas: boolean; // 开关canvas背景动效
  background: ThemeBgEnum; // 主题名称
  showSettingButton: boolean;
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  grayMode: boolean;
  colorWeak: boolean;
  fullContent: boolean;
  permissionMode: PermissionModeEnum;
  headerSetting: HeaderSetting;
  menuSetting: MenuSetting;
  transitionSetting: TransitionSetting;
  showLogo: boolean;
  openKeepAlive: boolean;
  lockTime: number;
  showBreadCrumb: boolean;
  useOpenBackTop: boolean;
  canEmbedIFramePage: boolean;
}

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadCommonUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  logoName: string;
}
export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_LOGO_NAME: string;
  // Upload url
  VITE_GLOB_UPLOAD_COMMON_URL?: string;
}
