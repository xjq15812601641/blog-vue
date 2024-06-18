import {
  componentSetting,
} from "/@/modules/component-module/scrollbar-module/variable/componentSetting.data";

export const scrollbarProp = {
  native: {
    type: Boolean,
    default: componentSetting.scrollbar?.native ?? false,
  },
  wrapStyle: {
    type: [String, Array],
    default: '',
  },
  wrapClass: {
    type: [String, Array],
    default: '',
  },
  viewClass: {
    type: [String, Array],
    default: '',
  },
  viewStyle: {
    type: [String, Array],
    default: '',
  },
  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  tag: {
    type: String,
    default: 'div',
  },
}
export const BarProp = {
  vertical: Boolean,
  size: String,
  move: Number,
}
