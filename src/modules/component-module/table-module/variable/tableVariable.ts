import { Component, ComputedRef, InjectionKey, Ref, VNodeChild } from "vue";
import { RecordProps } from "/@/modules/component-module/table-module/interface/column/RecordProps";
import {
  TableActionType
} from "/@/modules/component-module/table-module/interface/table/TableActionType";
import {
  BasicTableProps
} from "/@/modules/component-module/table-module/interface/table/BasicTableProps";
import {
  ModalContextProps
} from "/@/modules/component-module/table-module/interface/modalContext/ModalContextProps";
import {
  componentSetting
} from "/@/modules/component-module/scrollbar-module/variable/componentSetting.data";

export declare type CustomRenderFunction<T> = (record: RecordProps<T>) => VNodeChild | JSX.Element;
export type EditRecordRow<T = Recordable> = Partial<
  {
    onEdit: (editable: boolean, submit?: boolean) => Promise<boolean>;
    onValid: () => Promise<boolean>;
    editable: boolean;
    onCancel: Fn;
    onSubmit: Fn;
    submitCbs: Fn[];
    cancelCbs: Fn[];
    validCbs: Fn[];
    editValueRefs: Recordable<Ref>;
  } & T
>;
export type ComponentType =
  | 'Input'
  | 'InputNumber'
  | 'Select'
  | 'ApiSelect'
  | 'ApiTreeSelect'
  | 'Checkbox'
  | 'Switch'
  | 'DatePicker'
  | 'TimePicker';
export declare type SortOrder = 'ascend' | 'descend';
export type SizeType = 'default' | 'middle' | 'small' | 'large';
export type CellFormat =
  | string
  | ((text: string, record: Recordable, index: number) => string | number)
  | Map<string | number, any>;
export type ColumnChangeParam = {
  dataIndex: string;
  fixed: boolean | 'left' | 'right' | undefined;
  visible: boolean;
};
export const basic_table_key = Symbol('basic-table');

export type Instance = TableActionType & {
  wrapRef: Ref<Nullable<HTMLElement>>;
  getBindValues: ComputedRef<Recordable>;
};

export type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>;
};
export const modal_context_key: InjectionKey<ModalContextProps> = Symbol();
const { table } = componentSetting;

const {
  pageSizeOptions,
  defaultPageSize,
  fetchSetting,
  defaultSize,
  defaultSortFn,
  defaultFilterFn,
} = table;

export const ROW_KEY = 'key';

// Optional display number per page;
export const PAGE_SIZE_OPTIONS = pageSizeOptions;

// Number of items displayed per page
export const PAGE_SIZE = defaultPageSize;

// Common interface field settings
export const FETCH_SETTING = fetchSetting;

// Default Size
export const DEFAULT_SIZE = defaultSize;

// Configure general sort function
export const DEFAULT_SORT_FN = defaultSortFn;

export const DEFAULT_FILTER_FN = defaultFilterFn;

//  Default layout of table cells
export const DEFAULT_ALIGN = 'center';

export const INDEX_COLUMN_FLAG = 'INDEX';

export const ACTION_COLUMN_FLAG = 'ACTION';
export const componentMap = new Map<ComponentType, Component>();
