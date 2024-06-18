<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate"> 新增菜单 </a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                onClick: handleEdit.bind(null, record),
              },
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
    <MenuDrawer @register="registerDrawer" @success="handleSuccess" />
  </div>
</template>

<script lang="ts" setup>
  import { nextTick } from 'vue';
  import { getMenuList, deleteMenu } from '/@/api/menu';
  import MenuDrawer from './MenuDrawer.vue';
  import { columns } from './menu.data';
  import { BlogMessage } from "/@/modules/message-module/blogMessage";
  import { useDrawer } from "/@/modules/component-module/drawer-module/method/useDrawer";
  import { useTable } from "/@/modules/component-module/table-module/method/table/useTable";

  const { createMessage } = BlogMessage.useMessage();

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { reload, expandAll }] = useTable({
    title: '菜单列表',
    api: getMenuList,
    columns,
    isTreeTable: true,
    pagination: false,
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    bordered: false,
    showIndexColumn: false,
    canResize: false,
    actionColumn: {
      width: 80,
      title: '操作',
      dataIndex: 'action',
      fixed: undefined,
    },
  });

  function handleCreate() {
    openDrawer(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openDrawer(true, {
      record,
      isUpdate: true,
    });
  }

  async function handleDelete(record: Recordable) {
    const { message } = await deleteMenu({ id: record.id });
    createMessage.success(message);

    console.log(record);
  }

  function handleSuccess(message: string) {
    createMessage.success(message);

    reload();
    // window.location.reload();
  }

  function onFetchSuccess() {
    // 演示默认展开所有表项
    nextTick(expandAll);
  }
</script>
