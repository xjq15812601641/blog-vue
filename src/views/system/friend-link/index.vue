<template>
  <div>
    <BasicTable @register="registerTable">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts" setup>
  import { getFriendLink, removeFriendLink } from '/@/api/Link';
  import { columns } from './friend-link.data';
  import { BlogMessage } from "/@/modules/message-module/blogMessage";
  import { useTable } from "/@/modules/component-module/table-module/method/table/useTable";
  const { createMessage } = BlogMessage.useMessage();

  const [registerTable, { reload }] = useTable({
    title: '友链列表',
    api: getFriendLink,
    columns,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  async function handleDelete(record: Recordable) {
    const { message } = await removeFriendLink(record.id);
    createMessage.success(message);
    reload();
  }
</script>
