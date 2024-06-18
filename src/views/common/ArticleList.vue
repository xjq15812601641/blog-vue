<template>
  <div class="relative text-white flex flex-col flex-wrap !md:w-7/12 w-full mx-auto z-index-2">

    <div v-if="articleList.length" v-loading="listLoading">
      <div
        class="relative w-full overflow-hidden text-center mt-7 h-80 cursor-pointer z-index-3 list"
        v-for="item in articleList"
        :style="{ backgroundImage: `url(${item.imageUrl})` ,backgroundSize: 'cover' }"
        :key="item.id"
        @click="toDetail(item.id)"
      >
        <div class="ui label">
          <a href="javascript:;">123321</a>
        </div>
        <header
          class="absolute w-full text-center z-index-10 top-40 text-3xl font-medium header-title"
          >{{ item.title }}
        </header>
        <article class="absolute w-full px-12 top-40 z-index-10 h-11 hidden overflow-hidden article"
          >{{ item.content }}
        </article>
        <footer class="absolute w-full pl-10 text-left h-8 z-index-10 bottom-0 bg-white tips">
          {{ DateUtil.formatToDateTime(item.createTime)}}
          {{ item.comments }}条评论 {{ item.likes }}条点赞 {{ item.browse }}条浏览
        </footer>
        <div class="absolute w-full h-80 top-72 bg-dark-900/50 z-index-4 rounded mark"></div>
      </div>
      <div class="flex py-2 items-center justify-end mt-6" v-if="pagination.total > 10">
        <a-pagination
          showLessItems
          size="small"
          :pageSize="pagination.pageSize"
          :total="pagination.total"
          :current="pagination.currentPage"
          :show-total="(total) => `共 ${total} 条`"
          @change="handlePageChange"
        />
      </div>
    </div>

    <div v-else class="w-full h-auto bg-white/50 mt-5 rounded" v-loading="listLoading">
      <EmptyData v-if="listLoading === false" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref, reactive } from 'vue';
  import { Pagination } from 'ant-design-vue';
  import useLayoutGoTop from './hooks/useLayoutGoTop';
  import { useRoute } from 'vue-router';
  import { getArticleList, getCategory } from '/@/api/article/index';
  import {Article, Category} from '/@/api/article/model/indexModel';
  import type { CategoryCondition } from './types';
  import { DateUtil } from "/@/utils/dateUtil/dateUtil";
  import EmptyData from './EmptyData.vue';
  import { nextTick } from 'vue';
  import { useGo } from "/@/modules/blogComp-module/method/useGo";

  const listLoading = ref(false);
  const { goTop } = useLayoutGoTop();
  const APagination = Pagination;
  const articleList = ref<Array<Article>>([]);
  const go = useGo();
  const route = useRoute();
  const currentType = ref<Category>();
  const currentActiveIndex = ref(0);
  const subTypeList = ref<Array<Category>>([]);
  const pagination = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });

  const showLabelBlackList = ['/dashboard', '/relife/list', '/relife/detail'];
  const isShowLabel = computed(() => !showLabelBlackList.includes(route.path));

  onMounted(async () => {
    if (isShowLabel.value) {
      await createCategory();
    }
    await createList();
  });

  const observe = () => {
    const imgList = document.querySelectorAll('.list');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((item) => {
        if (item.isIntersecting) {
          const dom = item.target as HTMLElement;
          const url = dom.getAttribute(':style');
          if (url) {
            const img = new Image();
            img.src = url;
            img.onload = () => {
              dom.style.backgroundImage = `url(${url})`;
            };
          }
          io.unobserve(item.target);
        }
      });
    });

    imgList.forEach((img) => {
      io.observe(img);
    });
  };

  observe();


  // 获取文章分类信息。根据当前路由的路径，调用 getCategory 接口获取分类信息，并将结果赋值给 currentType 和 subTypeList 变量
  const createCategory = async () => {
    const { type, children } = await getCategory({
      path: /\/[^/]+$/.exec(route.path)![0],
    });
    currentType.value = type;
    subTypeList.value = children;
  };

  // 获取文章列表数据。根据当前的分类条件、关键字和分页信息，调用 getArticleList 接口获取文章列表数据，并更新 articleList 和 pagination 变量。
  const createList = async () => {
    const categoryCondition: CategoryCondition = {
      type: undefined,
      subType: undefined,
      path: route.path,
    };

    if (isShowLabel.value) {
      const subType = subTypeList.value[currentActiveIndex.value];
      categoryCondition.type = currentType.value!.id;
      if (subType.id !== -1) {
        categoryCondition.subType = subType.id;
      }
    }

    try {
      // listLoading.value = true;
      const keyword = route.query.k;
      const { current, total, records } = await getArticleList({
        current: pagination.currentPage,
        keyword,
        ...categoryCondition,
      });
      pagination.currentPage = current;
      pagination.total = total;
      articleList.value = records;
    } finally {
      // listLoading.value = false;
      nextTick(observe);
    }
  };


  // 处理分页器的页码变化事件。当页码变化时，调用 goTop 方法回到页面顶部，并更新 pagination.currentPage 变量
  function handlePageChange(page: number) {
    goTop();
    pagination.currentPage = page;
    const timer = setTimeout(() => {
      clearTimeout(timer);
      createList();
    }, 500);
  }

  // 该方法用于跳转到文章详情页面。根据传入的文章 ID
  const toDetail = (id: number) => {
    const perfixUrl = route.path.includes('relife') ? '/relife/detail?id=' : '/article/detail?id=';
    go(`${perfixUrl}${id}`);
  };
</script>

<style lang="less" scoped>
  .header-title {
    transform: translateY(-50%);
  }

  .article {
    word-break: break-all;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 这里是超出几行省略 */
    text-indent: 2rem;
  }

  .tips {
    line-height: 30px;
    color: #555;
  }

  .mark {
    transition: top 0.05s linear;
  }

  .list:hover {
    box-shadow: 0 0 7px 5px rgb(85, 96, 255);

    .mark {
      top: 0;
    }

    .header-title {
      top: 30%;
    }

    .article {
      display: -webkit-box;
    }
  }

  .ant-pagination {
    color: white !important;
  }
</style>
