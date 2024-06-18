<template>
  <main class="w-11/12 md:w-3/4 mx-auto bg-white/50 p-2 sm:p-8 mt-7 rounded relative z-index-3">



    <!--头像和介绍-->
    <article class="flex justify-center">
      <div class="flex-col flex items-center justify-center relative" >
        <div id="margin" alt="siwang" :style="{   backgroundImage: `url(${background})`, backgroundSize: 'cover'   }"
             class="w-30 h-30 cursor-pointer z-index-2 transform hover:rotate-360 duration-500 transition-all rounded-1/2"/>
        <p class="font-bold text-xl mt-5 w-full">Hi，我是siwang，前端萌新一枚~~</p>
      </div>
    </article>




    <!--链接分享主体部分-->
    <main class="w-full">
      <h4 class="friend-link">好链接分享：</h4>
      <!--让网站对其展示-->
      <div v-if="linkList.length" class="flex flex-start flex-wrap">
        <!--遍历获取到的网站信息-->
        <div v-for="site in linkList" :key="site.id" @click="toSite(site.siteUrl)"
          class="w-full sm:w-1/3 md:w-1/3 lg:w-1/4 border rounded flex flex-col text-center cursor-pointer m-8 p-4 link-item">
          <img :src="site.logo" @error="handleImg" alt="网站logo"
               class="w-full h-full site-logo w-18 h-18 cursor-pointer mx-auto rounded-1/2 overflow-hidden"/><!--网站logo-->
          <p class="mt-2">{{ site.siteName }}</p><!--网站名称-->
          <Divider style="border-color: #000000" /><!--一条黑色的分割线-->
          <p class="ellipsis-2 text-left" style="text-indent: 2em" >{{ site.msg }}</p><!--网站介绍-->
        </div>
        <!--当数据总数大于9时才会显示，用于点击刷新页面，并通过后端获取该页面的列表-->
        <div class="w-full flex py-2 justify-end mt-6" v-if="pagination.total > 9">
          <a-pagination
            showLessItems
            size="small"
            :pageSize="pagination.size"
            :total="pagination.total"
            :current="pagination.current"
            :show-total="(total) => `共 ${total} 条`"
            @change="handlePageChange"/>
        </div>
      </div>
      <EmptyData v-else />
    </main>


  </main>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Divider, Pagination } from 'ant-design-vue';
  import { getLink } from '/@/api/Link';
  import { LinkModel } from '/@/api/Link/model/indexModel';
  import EmptyData from '../common/EmptyData.vue';



  /**
   * background：头像
   * APagination：分页组件
   * pagination：初始化一个基本的分页规则，用于传给后端
   * */
  const background = ref('https://www.freeimg.cn/i/2024/03/11/65ee5dc0b29d0.jpg');
  const APagination = Pagination;
  const linkList = ref<Array<LinkModel>>([]);
  const pagination = reactive({
    current: 1,
    size: 9,
    total: 0,
  });





  /**
   * createLinkList：传入当前分页规则获取数据给linkList
   * handlePageChange：点击对应页数就改变pagination当前要展示的页数，调用createLinkList方法给重新响应式linkList赋值
   * toSite：新建一个页面用于跳转
   * */
  const createLinkList = async () => {
    const { current, total, records } = await getLink({ ...pagination });
    linkList.value = records;
    pagination.current = current;
    pagination.total = total;
  };
  const handlePageChange = (page: number) => {
    pagination.current = page;
    createLinkList();
  };
  const toSite = (url: string) => {
    window.open(url, '_blank');
  };/*链接跳转方式——新页面跳转*/
  createLinkList();


</script>

<style lang="less" scoped>
  .header-img {
    transition: all 0.25s linear;
  }

  .header-img:hover {
    transform: rotate(360deg);
  }

  .friend-link {
    border-left: 4px solid #0960bd;
    padding-left: 20px;
    font-size: 16px;
    font-weight: 600;
  }

  .link-item:hover {
    transform: translateY(-5px);
    transform: scale(1.02);
    box-shadow: 0 0 2px 2px rgb(85, 96, 255);
    background: linear-gradient(
      to right,
      #b5eeba67,
      #756aee62,
      #df827881,
      #c77be780,
      #89ebe170,
      #e2e27d94
    );
    background-size: 500%;
    animation: gradual 17s linear infinite;
  }

  .site-logo {
    object-fit: cover;
  }
</style>
