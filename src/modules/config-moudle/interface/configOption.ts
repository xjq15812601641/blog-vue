import { BackgroundEnum } from '/@/enums/backgroundEnum';
import { SessionTimeoutProcessingEnum } from '/@/enums/sessionTimeoutProcessingEnum';
import { RoutePermissionEnum } from '/@/enums/routePermissionEnum';
import { ConfigHeader } from '/@/modules/store-module/interface/config-interface/configHeader';
import { MenuSetting } from '/@/modules/store-module/interface/config-interface/menuSetting';
import { ConfigTransition } from '/@/modules/store-module/interface/config-interface/configTransition';

export interface ConfigOption {
  /**
   * 特效开关
   */
  canvas: boolean;
  /**
   * 背景设置
   */
  background: BackgroundEnum;
  /**
   * 按钮开关
   */
  settingButton: boolean;
  /**
   * 超时处理
   */
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  /**
   * 灰色模式
   */
  mode_gray: boolean;
  /**
   * 色弱开关
   */
  color_weak: boolean;
  /**
   * 回到顶部
   */
  top_navigation_bar: boolean;
  /**
   * 权限设置
   */
  mode_permission: RoutePermissionEnum;
  /**
   * 标头设置
   */
  headerSetting: ConfigHeader;
  /**
   * 菜单设置
   */
  menuSetting: MenuSetting;
  /**
   * 效果设置
   */
  transitionSetting: ConfigTransition;
  /**
   * logo显示
   */
  showLogo: boolean;
  /**
   * 存活设置
   */
  keepAlive: boolean;
  /**
   * 锁定时间
   */
  lockTime: number;
  /**
   * 面包屑设置
   */
  showBreadCrumb: boolean;
  /**
   * 回到顶部显示
   */

  /**
   * 嵌入框架页面
   */
  EmbedIFramePage: boolean;
  /**
   * 是否全屏
   * */
  fullContent: boolean;

}
