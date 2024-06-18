<template>
  <BasicModal
    width="800px"
    title="预览"
    class="upload-preview-modal"
    v-bind="$attrs"
    @register="register"
    :showOkBtn="false"
  >
    <FileList :dataSource="fileListRef" :columns="columns" :actionColumn="actionColumn" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, watch, ref } from 'vue';
  import FileList from './FileList.vue';
  import { previewProps } from "/@/modules/component-module/upload-module/variable/uploadProps";
  import BasicModal from "/@/components/Modal/BasicModal.vue";
  import { PreviewFileItem } from "/@/modules/component-module/upload-module/interface/PreviewFileItem";
  import { ModalInner } from "/@/modules/component-module/modal-module/method/modalInner";
  import { isArray } from "/@/utils/is/is";
  import { createPreviewColumns } from "/@/modules/component-module/upload-module/method/createPreviewColumns";
  import { createPreviewActionColumn } from "/@/modules/component-module/upload-module/method/createPreviewActionColumn";
  import { downloadByUrl } from "/@/modules/file-module/method/downloadByUrl";

  export default defineComponent({
    components: { BasicModal, FileList },
    props: previewProps,
    emits: ['list-change', 'register', 'delete'],
    setup(props, { emit }) {
      const {register, closeModal } = new ModalInner();

      const fileListRef = ref<PreviewFileItem[]>([]);
      watch(
        () => props.value,
        (value) => {
          if (!isArray(value)) value = [];
          fileListRef.value = value
            .filter((item) => !!item)
            .map((item) => {
              return {
                url: item,
                type: item.split('.').pop() || '',
                name: item.split('/').pop() || '',
              };
            });
        },
        { immediate: true },
      );

      // 删除
      function handleRemove(record: PreviewFileItem) {
        const index = fileListRef.value.findIndex((item) => item.url === record.url);
        if (index !== -1) {
          const removed = fileListRef.value.splice(index, 1);
          emit('delete', removed[0].url);
          emit(
            'list-change',
            fileListRef.value.map((item) => item.url),
          );
        }
      }

      // // 预览
      // function handlePreview(record: PreviewFileItem) {
      //   const { url = '' } = record;
      //   createImgPreview({
      //     imageList: [url],
      //   });
      // }

      // 下载
      function handleDownload(record: PreviewFileItem) {
        const { url = '' } = record;
        downloadByUrl({ url });
      }

      return {
        register,
        closeModal,
        fileListRef,
        columns: createPreviewColumns() as any[],
        actionColumn: createPreviewActionColumn({ handleRemove, handleDownload }) as any,
      };
    },
  });
</script>
<style lang="less">
  .upload-preview-modal {
    .ant-upload-list {
      display: none;
    }

    .ant-table-wrapper .ant-spin-nested-loading {
      padding: 0;
    }
  }
</style>
