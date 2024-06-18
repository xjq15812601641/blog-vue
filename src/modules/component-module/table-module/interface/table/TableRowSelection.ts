import { TableRowSelection as ITableRowSelection } from "ant-design-vue/lib/table/interface";

export interface TableRowSelection<T = any> extends ITableRowSelection {
  /**
   * Callback executed when selected rows change
   * @type Function
   */
  onChange?: (selectedRowKeys: string[] | number[], selectedRows: T[]) => any;

  /**
   * Callback executed when select/deselect one row
   * @type Function
   */
  onSelect?: (record: T, selected: boolean, selectedRows: Object[], nativeEvent: Event) => any;

  /**
   * Callback executed when select/deselect all rows
   * @type Function
   */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => any;

  /**
   * Callback executed when row selection is inverted
   * @type Function
   */
  onSelectInvert?: (selectedRows: string[] | number[]) => any;
}
