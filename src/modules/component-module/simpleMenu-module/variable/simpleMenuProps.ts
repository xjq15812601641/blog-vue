import { PropType } from "vue";
import { propTypes } from "/@/utils/propType/propTypes";

export const menuProp = {
  theme: propTypes.oneOf(['light', 'dark']).def('light'),
  activeName: propTypes.oneOfType([propTypes.string, propTypes.number]),
  openNames: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  accordion: propTypes.bool.def(true),
  width: propTypes.string.def('100%'),
  collapsedWidth: propTypes.string.def('48px'),
  indentSize: propTypes.number.def(16),
  collapse: propTypes.bool.def(true),
  activeSubMenuNames: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
}
export const MenuItemProp ={
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  disabled: propTypes.bool,
}

export const SubMenuItemProp =  {
  name: {
    type: [String, Number] as PropType<string | number>,
    required: true,
  },
  disabled: propTypes.bool,
  collapsedShowTitle: propTypes.bool,
}
