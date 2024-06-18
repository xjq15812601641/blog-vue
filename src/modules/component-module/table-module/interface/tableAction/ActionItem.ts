import { ButtonProps } from "ant-design-vue/es/button/buttonTypes";
import { RoleEnum } from "/@/enums/roleEnum";
import { TooltipProps } from "ant-design-vue/es/tooltip/Tooltip";
import { PopConfirm } from "/@/components/Table/src/types/tableAction";

export interface ActionItem extends ButtonProps {
  onClick?: Fn;
  label?: string;
  color?: 'success' | 'error' | 'warning' | '#136fcf';
  icon?: string;
  popConfirm?: PopConfirm;
  disabled?: boolean;
  divider?: boolean;
  // 权限编码控制是否显示
  auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((action: ActionItem) => boolean);
  tooltip?: string | TooltipProps;
}
