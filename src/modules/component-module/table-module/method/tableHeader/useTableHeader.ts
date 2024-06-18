import { computed, ComputedRef, h, Slots, unref } from "vue";
import TableHeader from "/@/components/Table/components/TableHeader.vue";
import {
  BasicTableProps
} from "/@/modules/component-module/table-module/interface/table/BasicTableProps";
import {
  InnerHandlers
} from "/@/modules/component-module/table-module/interface/table/InnerHandlers";
import { isString } from "/@/utils/is/is";
import { getSlot } from "/@/utils/BlogUtils";

export function useTableHeader(
  propsRef: ComputedRef<BasicTableProps>,
  slots: Slots,
  handlers: InnerHandlers,
) {
  const getHeaderProps = computed((): Recordable => {
    const { title, showTableSetting, titleHelpMessage, tableSetting } = unref(propsRef);
    const hideTitle = !slots.tableTitle && !title && !slots.toolbar && !showTableSetting;
    if (hideTitle && !isString(title)) {
      return {};
    }

    return {
      title: hideTitle
        ? null
        : () =>
          h(
            TableHeader,
            {
              title,
              titleHelpMessage,
              showTableSetting,
              tableSetting,
              onColumnsChange: handlers.onColumnsChange,
            } as Recordable,
            {
              ...(slots.toolbar
                ? {
                  toolbar: () => getSlot(slots, 'toolbar'),
                }
                : {}),
              ...(slots.tableTitle
                ? {
                  tableTitle: () => getSlot(slots, 'tableTitle'),
                }
                : {}),
              ...(slots.headerTop
                ? {
                  headerTop: () => getSlot(slots, 'headerTop'),
                }
                : {}),
            },
          ),
    };
  });
  return { getHeaderProps };
}
