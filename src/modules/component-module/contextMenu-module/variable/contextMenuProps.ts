import { CSSProperties } from "vue";
import { Axis } from "/@/modules/component-module/contextMenu-module/interface/Axis";
import {
  ContextMenuItem
} from "/@/modules/component-module/contextMenu-module/interface/ContextMenuItem";

export const contextMenuProp = {
  width: { type: Number, default: 156 },
  customEvent: { type: Object as PropType<Event>, default: null },
  styles: { type: Object as PropType<CSSProperties> },
  showIcon: { type: Boolean, default: true },
  axis: {
    // The position of the right mouse button click
    type: Object as PropType<Axis>,
    default() {
      return { x: 0, y: 0 };
    },
  },
  items: {
    // The most important list, if not, will not be displayed
    type: Array as PropType<ContextMenuItem[]>,
    default() {
      return [];
    },
  },
};
