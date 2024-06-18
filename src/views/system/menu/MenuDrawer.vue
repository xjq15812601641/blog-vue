<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { formSchema } from './menu.data';
  import { createMenu, getMenuList, updateMenu } from '/@/api/menu';
  import { useForm } from "/@/modules/component-module/form-module/method/useForm";
  import { useDrawerInner } from "/@/modules/component-module/drawer-module/method/useDrawerInner";

  const emits = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const currentId = ref('');

  const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
    labelWidth: 100,
    schemas: formSchema,
    showActionButtonGroup: false,
    baseColProps: { lg: 12, md: 24 },
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
    resetFields();
    setDrawerProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      // console.log('data', data.record);
      currentId.value = data.record.id;
      setFieldsValue({
        ...data.record,
      });
    }
    const treeData = await getMenuList();
    updateSchema({
      field: 'pid',
      componentProps: { treeData },
    });
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      let msg;
      if (isUpdate.value) {
        const { message } = await updateMenu(currentId.value, values);
        msg = message;
      } else {
        const { message } = await createMenu(values);
        msg = message;
      }
      closeDrawer();
      emits('success', msg);
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
