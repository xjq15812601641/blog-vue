import { ComputedRef, unref } from "vue";
import {
  BasicTableProps
} from "/@/modules/component-module/table-module/interface/table/BasicTableProps";
import {
  TableCustomRecord
} from "/@/modules/component-module/table-module/interface/table/TableCustomRecord";
import { isFunction } from "/@/utils/is/is";

export function useTableStyle(propsRef: ComputedRef<BasicTableProps>, prefixCls: string) {
  function getRowClassName(record: TableCustomRecord<any>, index: number) {
    const { striped, rowClassName } = unref(propsRef);
    const classNames: string[] = [];
    if (striped) {
      classNames.push((index || 0) % 2 === 1 ? `${prefixCls}-row__striped` : '');
    }
    if (rowClassName && isFunction(rowClassName)) {
      classNames.push(rowClassName(record, index));
    }
    return classNames.filter((cls) => !!cls).join(' ');
  }

  return { getRowClassName };
}
