import { ComponentType } from "/@/modules/component-module/table-module/variable/tableVariable";

export interface ComponentProps {
  component: ComponentType;
  rule: boolean;
  popoverVisible: boolean;
  ruleMessage: string;
  getPopupContainer?: Fn;
}
