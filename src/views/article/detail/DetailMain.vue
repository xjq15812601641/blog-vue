<template>

  <div class="w-full sm:w-2/3 mx-auto mt-1 xl:h-80 lg:h-70 md:h-60 sm:h-60 h-30 bg-dark-900/50 relative z-index-2 rounded ">
    <div
      :style="{ backgroundImage: `url(${articleInfo.imageUrl})` ,backgroundSize: 'cover' }"
      class="w-full h-full bg-dark-700/50 text-center flex justify-center items-center">
      <h1 class="text-white text-2xl lg:text-6xl md:text-5xl sm:text-4xl font-bold">{{articleInfo.title}}</h1>
    </div>
  </div><!--标题和背景-->

  <div class="sm:w-2/3 w-full mx-auto bg-white rounded-xl sm:p-10 p-5 mt-12 relative z-index-2">

    <!--文章主题头-->
    <header class="w-full text-center mb-15">
      <h3 class="flex justify-between mb-5">
        <!--返回按钮-->
        <Tooltip title="返回" placement="top">
          <Icon :size="30" @click="goback"
                icon="fontisto:arrow-return-left" class="cursor-pointer mb-6 pt-1 text-gray-800 hover:text-purple-700"/>
        </Tooltip>
        <!--标题-->
        <span class="text-4xl font-bold">{{ articleInfo.title }}</span>
        <!--进入编辑模式-->
        <Tooltip title="编辑" placement="top">
          <Icon :size="isSuper ? 30 : 0" @click="goEdit"
                icon="mingcute:edit-line" class="cursor-pointer mb-6 pt-1 text-gray-800 hover:text-purple-700"/>
        </Tooltip>
      </h3>
      <span>
        <Icon icon="bxs:time-five" class="mx-1 icon-clock" size="18" color="#666666" /><div class="time-jump">发表于{{currentTime }}</div>
        <Icon icon="fa:eye" class="mx-1 ml-3" color="#757575" /><div class="time-jump">{{ articleInfo.browse }}次浏览</div>
        <Icon icon="bxs:like" class="mx-1 ml-3 icon-heart" size="18" color="#757575" /><div class="time-jump">{{articleInfo.likes}}次点赞</div>
        <Icon icon="ant-design:star-filled" class="mx-1 ml-3 icon-collect" size="18" color="#757575"/><div class="time-jump">{{ articleInfo.collects }}次收藏</div>
      </span>
    </header>

    <!--文章内容部分-->
    <div ref="viewContainer" class="w-full h-auto mb-20"/>

    <!--对文章功能-->
    <div class="my-4 w-full text-right">
      <button class="tec-button" @click="userOption('like')">
        <Icon icon="bxs:like" class="icon-heart mr-1" size="18" color="#fb7299" />点赞 | {{ articleInfo.likes }}
      </button>
      <button class="tec-button" @click="userOption('collect')">
        <Icon icon="ant-design:star-filled" class="mr-1 icon-collect" size="18" color="#fb7299"/>收藏 | {{ articleInfo.collects }}
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { Tooltip } from 'ant-design-vue';
import Icon from '/@/components/Icon/Icon.vue';
import { useRoute, useRouter } from 'vue-router';
import useArticleInfo from '/@/views/article/hooks/useArticleInfo';
import { ref, onMounted, computed } from 'vue';
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
import { BlogMessage } from "/@/modules/message-module/blogMessage";
import { DateUtil } from "/@/utils/dateUtil/dateUtil";


/**
 * userStore:准备用于获取当前登录人的身份
 * id：用于反馈进行点赞活动时的身份
 * route：当前页面的路由信息的路径，查询参数，参数
 * router：Router 实例，进行导航
 * viewContainer：用于以markdown的形式展示文章内容
 * */
const userStore = BlogUserStore;
const { id } = userStore.getUserInfo || {};
const route = useRoute();
const router = useRouter();
const viewContainer = ref<HTMLElement | null>(null);


/**
 * subject:进入编辑模式时的路径命名
 * createMessage:设置弹出的消息框
 * isSuper:判断是否为超级管理员
 * getArticleDetails为获取该id的文章，articleInfo为封装该文章的对象
 * currentTime：通过articleInfo获取到文章创建时间
 */
const subject = computed(() => (route.path === '/relife/detail' ? 'relife' : 'article'));
const { createMessage } = BlogMessage.useMessage();
const isSuper = computed(() => {    return userStore.getUserInfo.role === 'super';    });
const { getArticleDetails, articleInfo } = useArticleInfo(route.query.id as string, router);
const currentTime = computed(() => {    return DateUtil.formatToDateTime(articleInfo.value.createTime as unknown as any);    });


/**
 * 组件实例化后getArticleDetails异步获取文章信息给articleInfo对象赋值，然后为viewContainer节点的元素设置内容
 */
onMounted(async () => {
  await getArticleDetails();
  const el = viewContainer.value;//获取该节点
  if (el) {
    Vditor.preview(<HTMLDivElement>el,  articleInfo.value.content, {
      mode: 'dark',
      hljs: {
        style: 'vim',
        lineNumber: true,
      },
    });/*将 articleInfo.value.content 的内容预览在指定的 DOM 元素中（即 el）*/
    Vditor.setCodeTheme('atom-one-light',);//设置代码主题
  }
  new Vditor('vditor', {toolbar: [{hotkey: '⇧⌘S', name: 'sponsor', tipPosition: 's', className: 'right',}],})
});


/**
 * goback:回到上一页
 * goEdit：进入编辑模式
 */
const goback = () => {    router.back();    };
const goEdit = () => {router.push(`/article/publish?id=${route.query.id}&subject=${subject.value}`);    };















//发布文章
// const userOption = (action: string) => {
//   if (!getToken()) return createMessage.error('只有登录后才能操作哦~');
//   userClickAction(action);
// };
// const userClickAction = useThrottleFn(
//   async (action: string) => {
//     const articleId = route.query.id as string;
//     const { message } = await likeAndCollectArticle({articleId, id, action,});
//     createMessage.success(message);
//     createArticle();
//   },
//   1000,
//   false,
// );
</script>

<style lang="less" scoped>
textarea.ant-input {
  background-color: transparent !important;
  border: 1px solid #bdba07 !important;
}

.icon-clock {
  vertical-align: -3px !important;
}

.icon-heart,
.icon-collect {
  vertical-align: -4px !important;
}

.tec-button {
  border: 1px solid #c95817;
  border-radius: 20px;
  padding: 5px 20px;
  margin-left: 15px;
  color: #c95817;
}

.vditor-preview {
  text-align: center; /* 居中显示内容 */
}

.time-jump {
  animation: dance 5s infinite ease-in-out; /* 添加跳舞动画效果，持续5秒，无限循环，缓慢进出 */
  display: inline-block; /* 行内块元素显示 */
  margin: 0 5px; /* 设置外边距 */
  color: #fb7299 !important; /* 设置文字颜色为紫色，important 优先级高 */
}
</style>
