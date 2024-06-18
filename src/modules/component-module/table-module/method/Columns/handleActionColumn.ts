import { ComputedRef, unref } from "vue";
import { ACTION_COLUMN_FLAG } from "/@/components/Table/src/const";
import {
  BasicTableProps
} from "/@/modules/component-module/table-module/interface/table/BasicTableProps";
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";

export function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: BasicColumn[]) {
  const { actionColumn } = unref(propsRef);
  if (!actionColumn) return;

  const hasIndex = columns.findIndex((column) => column.flag === ACTION_COLUMN_FLAG);
  if (hasIndex === -1) {
    columns.push({
      ...columns[hasIndex],
      fixed: 'right',
      ...actionColumn,
      flag: ACTION_COLUMN_FLAG,
    });
  }
}
