import { ConfigOption } from '/@/modules/config-moudle/interface/configOption';
import { BackgroundEnum } from '/@/enums/backgroundEnum';
import { SessionTimeoutProcessingEnum } from '/@/enums/sessionTimeoutProcessingEnum';
import { RoutePermissionEnum } from '/@/enums/routePermissionEnum';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';
import { RouterTransitionModelEnum } from '/@/enums/routerTransitionModelEnum';

export const prefix_sup = 'sup';
export const projectOption: ConfigOption = {
  canvas: true, // 是否开启画布

  background: BackgroundEnum.setBackgroundOne, // 主题名称

  showLogo: true, // 是否显示logo

  settingButton: true, // 是否显示设置按钮

  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP, // 会话超时处理方式

  /* 权限模式 */
  mode_permission: RoutePermissionEnum.mapping, // 权限模式

  mode_gray: false, // 网站灰色模式

  color_weak: false, // 是否开启色弱模式

  top_navigation_bar: false, // 是否取消菜单、顶部、多标签页显示

  headerSetting: {
    show: true, // 是否显示头部
    fixed: true, // 头部是否固定
    showFullScreen: true, // 是否显示全屏按钮
    showNotice: true, // 是否显示通知按钮
  },

  // MenuConfig configuration
  /* type和mode一起决定了菜单的模式
   * 菜单模式:  左侧菜单模式     顶部菜单      左侧菜单混合模式    顶部菜单混合模式
   *    type:     sidebar      horizontal        mix-sidebar       horizontal
   *    mode:     inline       top-menu          inline              mix
   */
  menuSetting: {
    fixed: true, // 菜单是否固定
    mode: MenuModeEnum.horizontal, // 菜单模式
    type: MenuTypeEnum.topMenu, // 菜单类型
    menuWidth: 210, // 菜单宽度
    mixSideFixed: false, // 混合菜单是否固定
    collapsed: false, // 菜单是否折叠
    show: true, // 是否显示菜单
    hidden: false, // 是否隐藏菜单
    collapsedShowTitle: false, // 折叠时是否显示标题
    trigger: TriggerEnum.topShow, // 触发器
    split: false, // 是否分割菜单
  },

  // Transition Setting
  transitionSetting: {
    enable: true, // 是否启用过渡效果
    basicTransition: RouterTransitionModelEnum.FADE_SIDE, // 基本过渡效果
    openPageLoading: true, // 是否打开页面加载效果
    openNProgress: true, // 是否打开NProgress
  },
  keepAlive: false, // 是否开启页面缓存
  lockTime: 0, // 锁定时间
  showBreadCrumb: true, // 是否显示面包屑导航
  EmbedIFramePage: true, // 是否可以嵌入IFrame页面
  fullContent: false,
};
