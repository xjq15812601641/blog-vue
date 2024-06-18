<template>
  <PageWrapper>
    <div class="!md:w-3/4 p-4 rounded mx-auto mt-6 not-found-box">
      <div class="w-full bg-white/80 h-auto py-6 rounded text-center relative">
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
        <p class="text-xl text-purple-700/60 !sm:mt-16 !sm:text-3xl">
          抱歉！您没有权限访问该页面或该页面不存在! <br />
          {{ second }}s后返回首页
        </p>
        <Button type="primary" class="mt-6 !sm:mt-30 mb-6" @click="goHome">回到首页</Button>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { Button } from 'ant-design-vue';
  import PageWrapper from '/@/components/Page/PageWrapper.vue';
  import { ref } from 'vue';
  import { useGo } from "/@/modules/blogComp-module/method/useGo";

  /**
   * second:设置时间为5秒
   * background：设置背景为头像背景
   */
  const second = ref(5);
  const background = ref('https://www.freeimg.cn/i/2024/03/11/65ee5dc0b29d0.jpg');


  /**
   * timer：为second设置倒计时调用go方法
   */
  const timer = setInterval(() => {
    if (second.value <= 1) {
      clearInterval(timer);
      goHome();
    }
    second.value -= 1;
  }, 1000);
  const go = useGo();
  const goHome = () => {
    go('/');
  };
</script>

<style lang="less" scoped>
  .not-found-box {
    box-sizing: border-box;
  }

  .not-found-img {
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 400px;
    object-fit: cover;
  }

  .img-box {
    min-height: 230px;
  }
</style>
