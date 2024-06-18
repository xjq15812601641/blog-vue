// 文件上传列表
import TableAction from "/@/components/Table/components/TableAction.vue";
import { BasicColumn } from "/@/modules/component-module/table-module/interface/table/BasicColumn";
import {
  ActionItem
} from "/@/modules/component-module/table-module/interface/tableAction/ActionItem";

export function createActionColumn(handleRemove: Function): BasicColumn {
  return {
    width: 120,
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
      ];
      // if (checkImgType(record)) {
      //   actions.unshift({
      //     label: '预览',
      //     onClick: handlePreview.bind(null, record),
      //   });
      // }
      return <TableAction actions={actions} outside={true} />;
    },
  };
}
