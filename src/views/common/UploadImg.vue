<template>
  <div>
    <Upload
      v-model:file-list="fileList"
      list-type="picture-card"
      class="avatar-uploader"
      :show-upload-list="false"
      :action="props.action"
      :before-upload="beforeUpload"
      :headers="{ Authorization: userStore.getToken }"
    >
      <img
        v-if="props.initUrl"
        :src="status === 'beforeUpload' ? props.initUrl : imageUrl"
        alt="avatar"
        style="width: 100px; height: 100px; border-radius: 50%"
      />
      <div v-else>
        <loading-outlined v-if="loading" />
        <plus-outlined v-else />
        <div class="ant-upload-text">上传图片</div>
      </div>
    </Upload>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import type { UploadProps } from 'ant-design-vue';
  import { message, Upload } from 'ant-design-vue';
  import { BlogUserStore } from "/@/modules/store-module/variable/storeVariable";

  const fileList = ref([]);
  const loading = ref<boolean>(false);
  const imageUrl = ref<string>('');
  const status = ref('beforeUpload');
  const userStore = BlogUserStore;

  const props = defineProps({
    initUrl: { type: String as PropType<string>, default: '' },
    type: { type: String as PropType<string>, default: '' },
    action: { type: String as PropType<string>, default: '' },
  });

  //@ts-ignore
  const beforeUpload = (file: UploadProps['fileList'][number]) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   return message.error('只能上传jpg或png格式图片');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      return message.error('图片大小必须在2M以内');
    }

    return true;
  };
</script>
