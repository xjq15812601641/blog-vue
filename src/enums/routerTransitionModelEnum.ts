/**
 *  动画形式
 */
export enum RouterTransitionModelEnum {
  /**
   * 缩放并淡入淡出
   */
  ZOOM_FADE = 'zoom-fade',
  /**
   * 镜头拉远
   */
  ZOOM_OUT = 'zoom-out',
  /**
   * 缩放淡入淡出
   */
  FADE_SIDE = 'fade-slide',
  /**
   * 淡入淡出
   */
  FADE = 'fade',
  /**
   * 底部淡入淡出
   */
  FADE_BOTTOM = 'fade-bottom',
  /**
   * 按比例淡入淡出
   */
  FADE_SCALE = 'fade-scale',
}
