import { propTypes } from "/@/utils/propType/propTypes";
import { PropType } from "vue";

export const svgIconProps = {
  prefix: {
    type: String,
    default: 'icon',
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 16,
  },
  spin: {
    type: Boolean,
    default: false,
  },
};
export const iconProps = {
  // icon name
  icon: propTypes.string,
  // icon color
  color: propTypes.string,
  // icon size
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 16,
  },
  spin: propTypes.bool.def(false),
  prefix: propTypes.string.def(''),
};
export const iconPickerProps = {
  value: propTypes.string,
  width: propTypes.string.def('100%'),
  pageSize: propTypes.number.def(140),
  copy: propTypes.bool.def(false),
  mode: propTypes.oneOf<('svg' | 'iconify')[]>(['svg', 'iconify']).def('iconify'),
};
