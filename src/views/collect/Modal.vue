<template>
  <BasicModal v-bind="$attrs" @register="register" title="提示" @ok="handleOk">
    <span>确认取消收藏吗？</span>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { removeCollectArticle } from '/@/api/user';
  import { BlogMessage } from "/@/modules/message-module/blogMessage";
  import { useModalInner } from "/@/modules/component-module/modal-module/method/useModalInner";

  const { createMessage } = BlogMessage.useMessage();

  const emits = defineEmits(['refreshList']);

  const [register, { closeModal }] = useModalInner((data) => {
    data && onDataReceive(data);
  });
  const modelRef = ref<Recordable>({});

  const onDataReceive = (data) => {
    modelRef.value = { ids: data.ids };
  };
  const handleOk = async () => {
    try {
      const { message } = await removeCollectArticle({ ids: modelRef.value.ids });
      createMessage.success(message);
    } finally {
      closeModal();
      emits('refreshList');
    }
  };
</script>
