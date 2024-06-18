import { MenuModeEnum, MenuTypeEnum } from '/@/enums/menuEnum';

export interface ConfigMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
