import { ComputedRef, unref } from "vue";
import {
  BasicTableProps
} from "/@/modules/component-module/table-module/interface/table/BasicTableProps";
import { Options } from "/@/modules/component-module/table-module/interface/customRow/Options";
import { getKey } from "/@/modules/component-module/table-module/method/customRow/getKey";

export function useCustomRow(
  propsRef: ComputedRef<BasicTableProps>,
  { setSelectedRowKeys, getSelectRowKeys, getAutoCreateKey, clearSelectedRowKeys, emit }: Options,
) {
  const customRow = (record: Recordable, index: number) => {
    return {
      onClick: (e: Event) => {
        e?.stopPropagation();
        function handleClick() {
          const { rowSelection, rowKey, clickToRowSelect } = unref(propsRef);
          if (!rowSelection || !clickToRowSelect) return;
          const keys = getSelectRowKeys();
          const key = getKey(record, rowKey, unref(getAutoCreateKey));
          if (!key) return;

          const isCheckbox = rowSelection.type === 'checkbox';
          if (isCheckbox) {
            // 找到tr
            const tr: HTMLElement = (e as MouseEvent)
              .composedPath?.()
              .find((dom: HTMLElement) => dom.tagName === 'TR') as HTMLElement;
            if (!tr) return;
            // 找到Checkbox，检查是否为disabled
            const checkBox = tr.querySelector('input[type=checkbox]');
            if (!checkBox || checkBox.hasAttribute('disabled')) return;
            if (!keys.includes(key)) {
              setSelectedRowKeys([...keys, key]);
              return;
            }
            const keyIndex = keys.findIndex((item) => item === key);
            keys.splice(keyIndex, 1);
            setSelectedRowKeys(keys);
            return;
          }

          const isRadio = rowSelection.type === 'radio';
          if (isRadio) {
            if (!keys.includes(key)) {
              if (keys.length) {
                clearSelectedRowKeys();
              }
              setSelectedRowKeys([key]);
              return;
            }
            clearSelectedRowKeys();
          }
        }
        handleClick();
        emit('row-click', record, index, e);
      },
      onDblclick: (event: Event) => {
        emit('row-dbClick', record, index, event);
      },
      onContextmenu: (event: Event) => {
        emit('row-contextmenu', record, index, event);
      },
      onMouseenter: (event: Event) => {
        emit('row-mouseenter', record, index, event);
      },
      onMouseleave: (event: Event) => {
        emit('row-mouseleave', record, index, event);
      },
    };
  };

  return {
    customRow,
  };
}
