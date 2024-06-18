import { FetchParams } from "/@/modules/component-module/table-module/interface/table/FetchParams";
import {
  PaginationProps
} from "/@/modules/component-module/table-module/interface/pagination/PaginationProps";
import {
  GetColumnsParams
} from "/@/modules/component-module/table-module/interface/table/GetColumnsParams";
import { SizeType } from "/@/modules/component-module/table-module/variable/tableVariable";
import {
  TableRowSelection
} from "/@/modules/component-module/table-module/interface/table/TableRowSelection";
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import {
  BasicTableProps
} from "/@/modules/component-module/table-module/interface/table/BasicTableProps";

export interface TableActionType {
  /* 获取列表数据 */
  reload: (opt?: FetchParams) => Promise<void>;
  getSelectRows: <T = Recordable>() => T[];
  clearSelectedRowKeys: () => void;
  expandAll: () => void;
  expandRows: (keys: string[]) => void;
  collapseAll: () => void;
  scrollTo: (pos: string) => void; // pos: id | "top" | "bottom"
  getSelectRowKeys: () => string[];
  deleteSelectRowByKey: (key: string) => void;
  setPagination: (info: Partial<PaginationProps>) => void;
  setTableData: <T = Recordable>(values: T[]) => void;
  updateTableDataRecord: (rowKey: string | number, record: Recordable) => Recordable | void;
  deleteTableDataRecord: (rowKey: string | number | string[] | number[]) => void;
  insertTableDataRecord: (record: Recordable, index?: number) => Recordable | void;
  findTableDataRecord: (rowKey: string | number) => Recordable | void;
  getColumns: (opt?: GetColumnsParams) => BasicColumn[];
  setColumns: (columns: BasicColumn[] | string[]) => void;
  getDataSource: <T = Recordable>() => T[];
  getRawDataSource: <T = Recordable>() => T;
  setLoading: (loading: boolean) => void;
  setProps: (props: Partial<BasicTableProps>) => void;
  /* 窗口大小改变重新计算高度 */
  redoHeight: () => void;
  setSelectedRowKeys: (rowKeys: string[] | number[]) => void;
  getPaginationRef: () => PaginationProps | boolean;
  getSize: () => SizeType;
  getRowSelection: () => TableRowSelection<Recordable>;
  getCacheColumns: () => BasicColumn[];
  emit?: EmitType;
  updateTableData: (index: number, key: string, value: any) => Recordable;
  setShowPagination: (show: boolean) => Promise<void>;
  getShowPagination: () => boolean;
  setCacheColumnsByField?: (dataIndex: string | undefined, value: BasicColumn) => void;
}
