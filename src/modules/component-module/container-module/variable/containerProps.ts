import { PropType } from "vue";

export const CollapseHeaderProp = {
  prefixCls: { type: String },
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
  title: { type: String },
  show: { type: Boolean },
  canExpan: { type: Boolean },
}

export const LazyContainerProp = {
  /**
   * 等待时间，如果指定了时间，无论可见与否，指定时间后都会自动加载
   */
  timeout: { type: Number },
  /**
   * 组件所在的视口。
   * 如果组件在页面容器中滚动，则视口就是容器
   */
  viewport: {
    type: (typeof window !== 'undefined' ? window.HTMLElement : Object) as PropType<HTMLElement>,
    default: () => null,
  },
  /**
   * 预加载阈值，css 单元
   */
  threshold: { type: String, default: '0px' },
  /**
   * 视口的滚动方向，垂直表示垂直方向，水平表示水平方向
   */
  direction: {
    type: String,
    default: 'vertical',
    validator: (v) => ['vertical', 'horizontal'].includes(v),
  },
  /**
   * 包装组件的外部容器的标签名称
   */
  tag: { type: String, default: 'div' },
  maxWaitingTime: { type: Number, default: 80 },
  /**
   * 过渡名称
   */
  transitionName: { type: String, default: 'lazy-container' },
};
export const CollapseContainerProp = {
  title: { type: String, default: '' },
  loading: { type: Boolean },
  /**
   *  可以扩展吗
   */
  canExpan: { type: Boolean, default: true },
  /**
   * 标题右侧温馨提醒
   */
  helpMessage: {
    type: [Array, String] as PropType<string[] | string>,
    default: '',
  },
  /**
   * 是否在扩展和收缩时触发 window.resize，
   * 可以适应表格和表单，当表单收缩时，表单触发调整大小以适应高度
   */
  triggerWindowResize: { type: Boolean },
  /**
   * Delayed loading time
   */
  lazyTime: { type: Number, default: 0 },
}
