import { ColumnProps } from "ant-design-vue/lib/table";
import { SortOrder } from "/@/modules/component-module/table-module/variable/tableVariable";

export interface SorterResult {
  column: ColumnProps;
  order: SortOrder;
  field: string;
  columnKey: string;
}
