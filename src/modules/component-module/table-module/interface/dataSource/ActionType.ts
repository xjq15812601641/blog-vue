import { ComputedRef, Ref } from "vue";
import {
  PaginationProps
} from "/@/modules/component-module/table-module/interface/pagination/PaginationProps";

export interface ActionType {
  getPaginationInfo: ComputedRef<boolean | PaginationProps>;
  setPagination: (info: Partial<PaginationProps>) => void;
  setLoading: (loading: boolean) => void;
  getFieldsValue: () => Recordable;
  clearSelectedRowKeys: () => void;
  tableData: Ref<Recordable[]>;
}
