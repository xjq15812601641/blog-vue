import {
  ContextMenuItem
} from "/@/modules/component-module/contextMenu-module/interface/ContextMenuItem";
import { Axis } from "/@/modules/component-module/contextMenu-module/interface/Axis";

export interface ContextMenuProps {
  event?: MouseEvent;
  styles?: any;
  items: ContextMenuItem[];
  customEvent?: MouseEvent;
  axis?: Axis;
  width?: number;
  showIcon?: boolean;
}
