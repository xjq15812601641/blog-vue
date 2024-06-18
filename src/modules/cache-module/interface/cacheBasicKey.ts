import { ProjectKeyEnum } from '/@/enums/projectkeyEnum';
import { RouteLocationNormalized } from 'vue-router';
import { UserInfo } from '/#/store';
import { ConfigOption } from '/@/modules/config-moudle/interface/configOption';

export interface CacheBasicKey {
  /**
   * token钥匙
   */
  [ProjectKeyEnum.token_key]: string | number | null | undefined;
  /**
   * 用户信息键
   */
  [ProjectKeyEnum.userinfo_key]: UserInfo;
  /**
   * 身份信息键
   */
  [ProjectKeyEnum.role_key]: string[];
  /**
   * 锁定信息键
   */
  [ProjectKeyEnum.lockInfo_key]: LockInfo;
  /**
   * 项目设置键
   */
  [ProjectKeyEnum.projectConfig_key]: ConfigOption;
  /**
   * 规范化的路由位置对象键
   */
  [ProjectKeyEnum.routeController_key]: RouteLocationNormalized[];
}
