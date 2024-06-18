import { SortOrder } from "ant-design-vue/lib/table/interface";
import type { ColumnProps } from 'ant-design-vue/lib/table';
export interface SorterResult {
  column: ColumnProps;
  order: SortOrder;
  field: string;
  columnKey: string;
}
