import { ColumnFilterItem } from "/@/components/Table/src/types/column";

export interface FilterDropdownProps {
  prefixCls?: string;
  setSelectedKeys?: (selectedKeys: string[]) => void;
  selectedKeys?: string[];
  confirm?: () => void;
  clearFilters?: () => void;
  filters?: ColumnFilterItem[];
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  visible?: boolean;
}
