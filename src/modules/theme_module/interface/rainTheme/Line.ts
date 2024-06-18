export interface Line {
  /**
   * 雨滴下落速度
   */
  rainLineSpeed: number;
  /**
   * 雨滴存活设置
   */
  rainLineDie: boolean;
  /**
   * 雨滴落下的x
   */
  rainLineX: number;
  /**
   * 雨滴落下的y
   */
  rainLineY: number;
  /**
   * 雨滴的长度
   */
  rainLineLength: number;
  /**
   * 雨滴的颜色
   */
  rainLineColor: string;
}
