import { computed, ComputedRef, Ref, ref, toRaw, unref, watch } from "vue";
import { cloneDeep, isEqual } from "lodash-es";
import { ACTION_COLUMN_FLAG, INDEX_COLUMN_FLAG } from "/@/components/Table/src/const";
import { renderEditCell } from "/@/components/Table/components/editable";
import {
  BasicTableProps
} from "/@/modules/component-module/table-module/interface/table/BasicTableProps";
import {
  PaginationProps
} from "/@/modules/component-module/table-module/interface/pagination/PaginationProps";
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import {
  handleIndexColumn
} from "/@/modules/component-module/table-module/method/Columns/handleIndexColumn";
import {
  handleActionColumn
} from "/@/modules/component-module/table-module/method/Columns/handleActionColumn";
import { handleItem } from "/@/modules/component-module/table-module/method/Columns/handleItem";
import { isArray, isBoolean, isFunction, isString } from "/@/utils/is/is";
import {
  GetColumnsParams
} from "/@/modules/component-module/table-module/interface/table/GetColumnsParams";
import {
  sortFixedColumn
} from "/@/modules/component-module/table-module/method/Columns/sortFixedColumn";
import { formatCell } from "/@/modules/component-module/table-module/method/Columns/formatCell";

export function useColumns(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<boolean | PaginationProps>,
) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>;
  let cacheColumns = unref(propsRef).columns;

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));

    handleIndexColumn(propsRef, getPaginationRef, columns);
    handleActionColumn(propsRef, columns);
    if (!columns) {
      return [];
    }
    const { ellipsis } = unref(propsRef);

    columns.forEach((item) => {
      const { customRender, slots } = item;

      handleItem(
        item,
        Reflect.has(item, 'ellipsis') ? !!item.ellipsis : !!ellipsis && !customRender && !slots,
      );
    });
    return columns;
  });

  function isIfShow(column: BasicColumn): boolean {
    const ifShow = column.ifShow;

    let isIfShow = true;

    if (isBoolean(ifShow)) {
      isIfShow = ifShow;
    }
    if (isFunction(ifShow)) {
      isIfShow = ifShow(column);
    }
    return isIfShow;
  }
  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef));

    const columns = cloneDeep(viewColumns);
    return columns
      .filter((column) => {
        return isIfShow(column);
      })
      .map((column) => {
        const { slots, dataIndex, customRender, format, edit, editRow, flag } = column;

        if (!slots || !slots?.title) {
          column.slots = { title: `header-${dataIndex}`, ...(slots || {}) };
          // @ts-ignore
          column.customTitle = column.title;
          Reflect.deleteProperty(column, 'title');
        }
        const isDefaultAction = [INDEX_COLUMN_FLAG, ACTION_COLUMN_FLAG].includes(flag!);
        if (!customRender && format && !edit && !isDefaultAction) {
          column.customRender = ({ text, record, index }) => {
            // @ts-ignore
            return formatCell(text, format, record, index);
          };
        }

        // edit table
        if ((edit || editRow) && !isDefaultAction) {
          // @ts-ignore
          column.customRender = renderEditCell(column);
        }
        return column;
      });
  });

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
      cacheColumns = columns?.filter((item) => !item.flag) ?? [];
    },
  );

  function setCacheColumnsByField(dataIndex: string | undefined, value: Partial<BasicColumn>) {
    if (!dataIndex || !value) {
      return;
    }
    cacheColumns.forEach((item) => {
      if (item.dataIndex === dataIndex) {
        Object.assign(item, value);
        return;
      }
    });
  }
  /**
   * set columns
   * @param columnList key｜column
   */
  function setColumns(columnList: Partial<BasicColumn>[] | string[]) {
    const columns = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (columns.length <= 0) {
      columnsRef.value = [];
      return;
    }

    const firstColumn = columns[0];

    const cacheKeys = cacheColumns.map((item) => item.dataIndex);

    if (!isString(firstColumn)) {
      columnsRef.value = columns as BasicColumn[];
    } else {
      const columnKeys = columns as string[];
      const newColumns: BasicColumn[] = [];
      cacheColumns.forEach((item) => {
        newColumns.push({
          ...item,
          defaultHidden: !columnKeys.includes(item.dataIndex! || (item.key as string)),
        });
      });
      // Sort according to another array
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return (
            columnKeys.indexOf(prev.dataIndex as string) -
            columnKeys.indexOf(next.dataIndex as string)
          );
        });
      }
      columnsRef.value = newColumns;
    }
  }

  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, sort } = opt || {};
    let columns = toRaw(unref(getColumnsRef));
    if (ignoreIndex) {
      columns = columns.filter((item) => item.flag !== INDEX_COLUMN_FLAG);
    }
    if (ignoreAction) {
      columns = columns.filter((item) => item.flag !== ACTION_COLUMN_FLAG);
    }

    if (sort) {
      columns = sortFixedColumn(columns);
    }

    return columns;
  }
  function getCacheColumns() {
    return cacheColumns;
  }

  return {
    getColumnsRef,
    getCacheColumns,
    getColumns,
    setColumns,
    getViewColumns,
    setCacheColumnsByField,
  };
}
