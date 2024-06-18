import {
  ContextMenuItem
} from "/@/modules/component-module/contextMenu-module/interface/ContextMenuItem";

export interface CreateContextOptions {
  event: MouseEvent;
  icon?: string;
  styles?: any;
  items?: ContextMenuItem[];
}
