<template>
  <div class="sm:w-4/12 w-full block">
<!--    个人信息-->
    <section class="p-5 my-7 w-full">
      <header class="text-center relative">
        <div :style="{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover'
        }" alt="汪？" class="img-wrapper"/>
        <h1 class="absolute bottom-10 l-50% -mb-10 text-xl text-white w-full font-bold tracking-widest">
          <span class="opacity-40"> INFO </span>斯汪
        </h1>
      </header>
      <main>
        <SelfLink />
      </main>
    </section>



    <section class="w-full overflow-hidden pt-14 my-7">
      <h2 class="ui label">up的メッセージ</h2>
      <ul class="comment-box min-h-25" v-loading="commentListLoading">
        <li
          class="text-normal px-4"
          v-for="item in collectionList"
          :key="item.id"
        >
          <a href="javascript:;" class="block p-1" @click="toDetail(item.id)">
            <div class="ml-12">
              <p class="text-justify ellipsis-2 content" :title="item.content">你好{{ item.title }}</p>
            </div>
          </a>
        </li>
      </ul>

    </section>

<!--    <section class="w-full overflow-hidden pt-14 px-4">-->
<!--      <h2 class="ui label">最热文章</h2>-->
<!--      <ul v-loading="browseListLoading" class="min-h-25">-->
<!--        <li v-for="(item, index) in browseList" :key="'browseList' + index" class="my-4 ellipsis-2">-->
<!--          <a-->
<!--            href="javascript:;"-->
<!--            class="text-dark-600 font-semibold hover:text-purple-700"-->
<!--            :title="item.title"-->
<!--            @click="toDetail(item.id)"-->
<!--            >{{ item.title }}</a-->
<!--          >-->
<!--          —— {{ item.browse }} 次围观-->
<!--        </li>-->
<!--      </ul>-->
<!--    </section>-->
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import SelfLink from '/@/views/dashboard/SelfLink.vue';
  import {getArticleListByComment, getCollectionList} from '/@/api/article';
  import type {
    Collection,
  } from '/@/api/article/model/indexModel';
  import { useGo } from "/@/modules/blogComp-module/method/useGo";
  import { BlogUserStore } from "/@/modules/store-module/variable/storeVariable";
  import { useImgLoadError } from "/@/views/common/hooks/useImgLoadError";


  const appStore = BlogUserStore;

  const background = ref('https://www.freeimg.cn/i/2024/03/11/65ee5dc0b29d0.jpg')
  const go = useGo();
  const commentListLoading = ref(false);
  const browseListLoading = ref(false);
  // const browseList = ref<GetListByBrowseModel>([]);

  // const artCommentList = ref<GetListByCommentModel>([]);

  const collectionList = ref<Array<Collection>>([]);

  const createTopCommentList = async () => {
    commentListLoading.value = true;
    try {
      collectionList.value = await getCollectionList();
    } finally {
      commentListLoading.value = false;
    }
  };

  const createTopBrowseList = async () => {
    browseListLoading.value = true;
    try {
      // browseList.value = await getArticleListByBrowse();
    } finally {
      browseListLoading.value = false;
    }
  };

  const toDetail = (id: number) => {
    go(`/article/detail?id=${id}`);
  };

  const { handleImg } = useImgLoadError();

  onMounted(() => {
    createTopCommentList();
    // createTopBrowseList();
  });
</script>

<style lang="less" scoped>
  section {
    position: relative;
    transition: all 0.2s linear;
    background-color: #fff;
    border-radius: 5px;
    z-index: 3;

    header {
      border-radius: 5px 5px 0 0;
      text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.7);

      .img-wrapper {
        width: 100%;
        height: auto;
        min-height: 225px;
        max-height: 225px;
        overflow: hidden;
      }
    }

    .comment-box {
      li:hover div .content {
        color: #2a7dc9;
      }

      a {
        border-bottom: 1px solid #ddd;
        margin: 5px 0;
        color: #555;
      }

      .avatar {
        float: left;

        img {
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
  }

  section:hover {
    transform: translateY(-10px);
  }
</style>
