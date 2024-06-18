import TableAction from "/@/components/Table/components/TableAction.vue";
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import {
  ActionItem
} from "/@/modules/component-module/table-module/interface/tableAction/ActionItem";

export function createPreviewActionColumn({
                                            handleRemove,
                                            handleDownload,
                                          }: {
  handleRemove: Fn;
  handleDownload: Fn;
}): BasicColumn {
  return {
    width: 160,
    title: '操作',
    dataIndex: 'action',
    fixed: false,
    customRender: ({ record }) => {
      const actions: ActionItem[] = [
        {
          label: '删除',
          color: 'error',
          onClick: handleRemove.bind(null, record),
        },
        {
          label: '下载',
          onClick: handleDownload.bind(null, record),
        },
      ];

      return <TableAction actions={actions} outside={true} />;
    },
  };
}
