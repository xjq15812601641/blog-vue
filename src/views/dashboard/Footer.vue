<template>
  <div class="p-4 pb-1 mt-8 text-center text-white bg-dark-500/90 relative bottom-0 box-border">

    <span class="time-jump">(＾▽＾)o♪</span>

    <p class="my-2 z-index-3">
      博客已萌萌哒运行<span class="time-jump">{{ longTime }}</span>
    </p>

    <p class="my-2 z-index-3">
      博客の究极响应速度<span class="time-jump">{{ responseTime }}ms</span>
    </p>

    <p>
      <a class="time-jump" href="https://v3.cn.vuejs.org/" target="_blank">Vue3、</a>
      <a class="time-jump" href="https://www.antdv.com/components/overview-cn" target="_blank">ant-design-vue、</a>
      <a class="time-jump" href="https://vitejs.cn/" target="_blank">springboot</a>
    </p>

  </div>
</template>

<script setup lang="ts">
  import { ref} from 'vue';
    import { useResponseTime } from '/@/views/dashboard/Time'

  /**
   * 获取网站运行时长
   */
  const longTime = ref('');
  const runTime = () => {
    // 运行倒计时
    const oldTime = +new Date('2024/1/30 00:00:00');
    setInterval(() => {
      const nowTime = +new Date();
      const diffTime = nowTime - oldTime;
      const days = parseInt(diffTime / 1000 / 60 / 60 / 24, 10); // 计算剩余的天数
      const hours = parseInt((diffTime / 1000 / 60 / 60) % 24, 10); // 计算剩余的小时
      const minutes = parseInt((diffTime / 1000 / 60) % 60, 10); // 计算剩余的分钟
      const seconds = parseInt((diffTime / 1000) % 60, 10); // 计算剩余的秒数
      longTime.value = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒';
    }, 1000);
  };
  runTime();



  /**
   * 获取响应时间
   */
  const timeStore = useResponseTime();
  const responseTime = timeStore.getTime;

</script>

<style lang="less" scoped>
.time-jump {
  animation: dance 5s infinite ease-in-out; /* 添加跳舞动画效果，持续5秒，无限循环，缓慢进出 */
  display: inline-block; /* 行内块元素显示 */
  margin: 0 5px; /* 设置外边距 */
  color: #ebb6fd !important; /* 设置文字颜色为紫色，important 优先级高 */
}
</style>

