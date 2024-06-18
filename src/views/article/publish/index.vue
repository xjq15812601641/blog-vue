<template>
  <div class="p-2 my-5 w-3/4 mx-auto bg-dark-700/40 rounded">
    <div class="bg-white rounded mb-5 p-4">
      请输入标题：
      <a-input
        v-model:value="title"
        placeholder="请输入标题，不超过30个字"
        style="max-width: 400px; margin-bottom: 20px"
        allowClear
      />
      <br />
      类型：
      <RadioGroup v-model:value="subject" class="subject">
        <Radio value="article"> 文章 </Radio>
        <Radio value="relife"> 生活点滴 </Radio>
      </RadioGroup>
      <br />
      请选择分类：
      <a-cascader
        v-model:value="typeList"
        :field-names="{ label: 'name', value: 'id' }"
        :options="options"
        placeholder="请选择分类"
      />
      <div class="flex w-full mt-6">
        <p class="w-30"> 请上传背景图： </p>
        <Upload
          v-model:file-list="fileList"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :headers="{ Authorization: userStore.getToken }"
          :customRequest="customRequest"
          :before-upload="beforeUpload"
        >
          <template v-if="imageUrl">
            <div v-if="action === 'edit' && !tempFile" class="background-img"></div>
            <img v-else :src="imageUrl" alt="" />
          </template>

          <div v-else>
            <loading-outlined v-if="loading" />
            <plus-outlined v-else />
            <div class="ant-upload-text">Upload</div>
          </div>
        </Upload>
      </div>
    </div>
    <MarkDown
      v-model:value="content"
      @change="handleContentChange"
      ref="markDownRef"
      placeholder="请开始编写您的技术文档。。。"
    />
    <div class="w-full mt-8 text-right">
      <a-button class="mx-5" @click="cancel">取消</a-button>
      <a-button type="primary" @click="publish">发布</a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { categoryTreeModel } from '/@/api/category/model/indexModel';
  import { getCategory } from '/@/api/category';
  import { createArticle, modifyArticle } from '/@/api/article';
  import { uploadApi, deleteFileApi } from '/@/api/minio/index';
  import { CreateArticle } from '/@/api/article/model/indexModel';
  import { Cascader, message, Upload, Radio } from 'ant-design-vue';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import type { UploadProps } from 'ant-design-vue';
  import useArticleInfo from '/@/views/article/hooks/useArticleInfo';
  import { BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
  import { BlogMessage } from "/@/modules/message-module/blogMessage";
  import {
    MarkDownActionType
  } from "/@/modules/component-module/markdown-module/interface/MarkDownActionType";
  import { useFileStream } from "/@/utils/fileStream/method/useFileStream";
  import { getBase64 } from "/@/utils/file/method/getBase64";
  import { isProdMode } from "/@/utils/env/method/isProdMode";


  const userStore = BlogUserStore;

  const ACascader = Cascader;
  const RadioGroup = Radio.Group;

  const { createMessage } = BlogMessage.useMessage();

  const uploadArticleBgApi = uploadApi as any;

  // 背景图
  const id = ref('');
  const fileList = ref([]);
  const loading = ref<boolean>(false);
  const subject = ref('');
  const tempFile = ref();
  const imageUrl = ref<string>('');
  const realImgUrl = ref<string>('');

  const title = ref('');
  const typeList = ref<Array<string>>([]);
  const options = ref<categoryTreeModel>([]);

  const router = useRouter();
  const route = useRoute();
  const markDownRef = ref<Nullable<MarkDownActionType>>(null);
  const content = ref(``);
  const action = ref('');

  const init = async () => {
    action.value = route.query.id ? 'edit' : 'add';
    if (action.value === 'edit') {
      id.value = route.query.id as string;
      const type = route.query.subject;
      /* 文章信息 */
      const { createArticle, articleInfo } = useArticleInfo(id.value, type as string, router);
      await createArticle();
      subject.value = articleInfo.value.subject;
      title.value = articleInfo.value.title;
      typeList.value = [String(articleInfo.value.type), String(articleInfo.value.subType)];
      imageUrl.value = articleInfo.value.imageUrl;
      realImgUrl.value = articleInfo.value.imageUrl;
      content.value = articleInfo.value.content;

      nextTick(() => {
        const dom = document.querySelector('.background-img') as HTMLElement;
        const filename = articleInfo.value.imageUrl.split('/').at(-1)!;
        useFileStream(filename, 'article-background', dom);
      });
    }
  };

  /* 自定义上传 */
  // 自定义上传，可以自定义上传接口，不用通过action属性，还是非常灵活的
  const customRequest = async (file) => {
    imageUrl.value = (await getBase64(file.file)) as string;
    tempFile.value = file;
  };

  onMounted(init);

  function handleContentChange(v: string) {
    content.value = v;
  }

  const createCategory = async () => {
    options.value = await getCategory();
  };

  // 获取分类
  createCategory();

  // 验证是否必填项
  const validateValue = () => {
    if (
      !title.value ||
      !content.value ||
      !subject.value ||
      !realImgUrl.value ||
      typeList.value.length <= 1
    ) {
      return createMessage.error('标题、类型、分类、背景图和内容均不能为空');
    }
    return true;
  };

  // 上传文件到minio
  const doUpload = async () => {
    if (tempFile.value) {
      if (realImgUrl.value) {
        await doDeleteOldBg(realImgUrl.value);
      }
      // debugger;
      const { data } = await uploadArticleBgApi({
        name: 'file',
        file: tempFile.value.file,
        filename: tempFile.value.name,
        data: { type: 'article-background' },
      });
      realImgUrl.value = `${
        isProdMode() ? window.location.origin : 'https://shizuka.icu'
      }/img/static/article-background/${data.data.url}`;
    }
  };

  // 更换背景图后删除老的背景图
  const doDeleteOldBg = async (url: string) => {
    const oldFilename = /[^/]+\.\w{2,5}$/g.exec(url)?.[0] || '';
    await deleteFileApi(oldFilename, { bucket: 'article-background' });
  };

  const publish = async () => {
    await doUpload();
    if (validateValue() !== true) return;
    let msg;
    const baseParams: CreateArticle = {
      title: title.value,
      content: content.value,
      type: typeList.value[0],
      subType: typeList.value[1],
      imageUrl: realImgUrl.value,
      subject: subject.value,
    };
    if (action.value === 'edit') {
      const { message } = await modifyArticle({ id: id.value, ...baseParams });
      msg = message;
    } else {
      const { message } = await createArticle(baseParams);
      msg = message;
    }
    /* 创建 */
    createMessage.success(msg);
    const tragetUrl = route.query.subject
      ? `/${route.query.subject}/detail?id=${id.value}`
      : '/dashboard';
    router.replace(tragetUrl);
  };

  /* 取消 */
  const cancel = () => {
    router.back();
  };

  /* 上传时限制 */
  //@ts-ignore
  const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng = ['image/jpeg', 'image/png', 'image/webp', 'image/jfif'].includes(file.type);
    if (!isJpgOrPng) {
      message.error('不支持的图片类型');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小必须在2M以内');
      return false;
    }
    return true;
  };
</script>

<style lang="less" scoped>
  .avatar-uploader > .ant-upload {
    width: 168px;
    height: 128px;
  }

  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }

  .subject {
    margin-bottom: 20px;
    vertical-align: top;
  }

  .background-img {
    width: 100%;
    height: 100%;
  }
</style>
