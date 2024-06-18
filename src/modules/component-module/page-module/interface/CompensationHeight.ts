import { Ref } from "vue";

export interface CompensationHeight {
  // 使用 layout Footer 高度作为判断补偿高度的条件
  useLayoutFooter: boolean;
  // refs HTMLElement
  elements?: Ref[];
}
