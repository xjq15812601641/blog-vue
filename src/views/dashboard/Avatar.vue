<template>
  <div class="p-4">
    <div class="w-full">
      <div class="w-full h-70 flex items-center justify-center relative">
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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const background = ref('https://www.freeimg.cn/i/2024/03/11/65ee5dc0b29d0.jpg');
</script>



<style lang="less" scoped>
/* 定义圆形元素的基本样式 */
.circle-run {
  position: absolute;
  border: 3px solid transparent;
  border-radius: 50%;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

/* 第一个圆形元素样式，顺时针旋转 */
.circle-0 {
  width: 140px;
  height: 140px;
  border-left-color: #ff4111;
  border-right-color: #ffeb38;
  animation-name: rotate-clockwise;
}

/* 第二个圆形元素样式，逆时针旋转 */
.circle-1 {
  width: 180px;
  height: 180px;
  border-top-color: #14b8a6;
  border-bottom-color: #3bdfee;
  animation-name: rotate-counterclockwise;
}

/* 第三个圆形元素样式，交替缩放 */
.circle-2 {
  width: 180px;
  height: 180px;
  border-left-color: #53ff6a;
  border-right-color: #ff41c6;
  animation-name: rotate-alternate;
}

/* 定义顺时针旋转动画 */
@keyframes rotate-clockwise {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 定义逆时针旋转动画 */
@keyframes rotate-counterclockwise {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-360deg); }
}

/* 定义交替缩放动画 */
@keyframes rotate-alternate {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
</style>
