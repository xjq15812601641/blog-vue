<template>
  <div class="relative text-white flex flex-col flex-wrap !md:w-7/12 w-full mx-auto z-index-2 mt-7">
    <section class="relative bg-white p-5 mb-6 rounded">

      <header>
        <h1 class="text-center font-bold text-2xl">留言板</h1>
      </header>
      <section>
        <h2 class="text-center font-bold">博主时不时的留言</h2>
        <div class="w-full h-40 flex items-center justify-center relative">
          <div
            :style="{
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover'
          }"
            alt="siwang"
            class="w-30 h-30 cursor-pointer z-index-2 transform hover:rotate-360 duration-500 transition-all rounded-1/2"
            id="margin"
          ></div>
          <div class="circle-0 circle-run"></div>
          <div class="circle-1 circle-run"></div>
          <div class="circle-2 circle-run"></div>
        </div>
      </section>
    </section>
    <div class="p-5 bg-white rounded">
      <Comment />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Comment from '/@/views/common/Comment.vue';
  import { BlogConfigStore } from "/@/modules/store-module/variable/storeVariable";
  const appStore = BlogConfigStore;
  const background = ref('https://www.freeimg.cn/i/2024/03/11/65ee5dc0b29d0.jpg')

</script>

<style lang="less" scoped>
  .pic-wrapper {
    width: 100%;
    height: auto;
    max-height: 385px;
    overflow: hidden;
  }
</style>
