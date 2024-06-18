export interface BasicHelpProp {
  /**
   * 文本宽度
   */
  maxWidth?: string;
  /**
   * 是否显示序列号
   */
  showIndex?: boolean;
  /**
   * 字体颜色
   */
  color?: string;
  /**
   * 字体大小
   */
  fontSize?: string;
  /**
   * 字体方向
   */
  placement?: string;
  /**
   * 文本内容可以是字符串或字符串数组
   */
  text?: string[] | string;
}
