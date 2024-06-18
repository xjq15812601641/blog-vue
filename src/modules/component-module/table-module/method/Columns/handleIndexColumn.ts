import { ComputedRef, unref } from "vue";
import { INDEX_COLUMN_FLAG, PAGE_SIZE } from "/@/components/Table/src/const";
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import {
  BasicTableProps
} from "/@/modules/component-module/table-module/interface/table/BasicTableProps";
import {
  PaginationProps
} from "/@/modules/component-module/table-module/interface/pagination/PaginationProps";
import { isBoolean } from "/@/utils/is/is";

export function handleIndexColumn(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<boolean | PaginationProps>,
  columns: BasicColumn[],
) {
  const { showIndexColumn, indexColumnProps, isTreeTable } = unref(propsRef);

  let pushIndexColumns = false;
  if (unref(isTreeTable)) {
    return;
  }
  columns.forEach(() => {
    const indIndex = columns.findIndex((column) => column.flag === INDEX_COLUMN_FLAG);
    if (showIndexColumn) {
      pushIndexColumns = indIndex === -1;
    } else if (!showIndexColumn && indIndex !== -1) {
      columns.splice(indIndex, 1);
    }
  });

  if (!pushIndexColumns) return;

  const isFixedLeft = columns.some((item) => item.fixed === 'left');

  columns.unshift({
    flag: INDEX_COLUMN_FLAG,
    width: 50,
    title: '序号',
    align: 'center',
    customRender: ({ index }) => {
      const getPagination = unref(getPaginationRef);
      if (isBoolean(getPagination)) {
        return `${index + 1}`;
      }
      const { current = 1, pageSize = PAGE_SIZE } = getPagination;
      return ((current < 1 ? 1 : current) - 1) * pageSize + index + 1;
    },
    ...(isFixedLeft
      ? {
        fixed: 'left',
      }
      : {}),
    ...indexColumnProps,
  });
}
