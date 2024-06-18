import { CSSProperties, PropType } from "vue";
import { propTypes } from "/@/utils/propType/propTypes";
import { MenuSplitTyeEnum } from "/@/enums/menuSplitTyeEnum";
import { MenuModeEnum } from "/@/enums/menuEnum";

export const PageWrapperProp = {
  // 页面标题
  title: propTypes.string,
    // 是否紧凑模式
    dense: propTypes.bool,
  // 是否透明模式
  ghost: propTypes.bool,
  // 页面内容
  content: propTypes.string,
  // 内容区域样式
  contentStyle: {
  type: Object as PropType<CSSProperties>,
},
  // 是否设置内容区域背景色
  contentBackground: propTypes.bool,
    // 是否设置内容区域高度为全高度
    contentFullHeight: propTypes.bool,
  // 内容区域的自定义类名
  contentClass: propTypes.string,
  // 是否固定内容区域高度
  fixedHeight: propTypes.bool,
  // 上方空间高度
  upwardSpace: propTypes.oneOfType([propTypes.number, propTypes.string]).def(0),
}
export const LayoutMenuProp = {
  theme: propTypes.oneOf(['light', 'dark']),

  splitType: {
    type: Number as PropType<MenuSplitTyeEnum>,
    default: MenuSplitTyeEnum.NONE,
  },

  isHorizontal: propTypes.bool,
  // menu Mode
  menuMode: {
    type: [String] as PropType<Nullable<MenuModeEnum>>,
    default: '',
  },
}
