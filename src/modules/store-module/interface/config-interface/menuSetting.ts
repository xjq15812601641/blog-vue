import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '/@/enums/menuEnum';

/**
 * 菜单设置
 */
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
