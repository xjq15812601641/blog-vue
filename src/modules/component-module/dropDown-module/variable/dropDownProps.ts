import { PropType } from "vue";
import { DropMenu } from "/@/modules/component-module/dropDown-module/interface/DropMenu";

export const DropDownProp = {
  popconfirm: Boolean,
  /**
   * the trigger mode which executes the drop-down action
   * @default ['hover']
   * @type string[]
   */
  trigger: {
    type: [Array] as PropType<('contextmenu' | 'click' | 'hover')[]>,
    default: () => {
      return ['contextmenu'];
    },
  },
  dropMenuList: {
    type: Array as PropType<(DropMenu & Recordable)[]>,
    default: () => [],
  },
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
}
