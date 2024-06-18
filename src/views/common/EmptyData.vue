<template>
  <div class="w-full h-auto bg-white/50 mt-5 rounded" style="display: flex; justify-content: center;">
    <img
      :src="background"
      alt="汪？"
      @error="handleImageError"
      style="max-width: 100%; max-height: 100%;"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const background = ref('https://www.freeimg.cn/i/2024/01/31/65ba39b1d62c8.png');
const imageError = ref(false);

const handleImageError = () => {
  imageError.value = true;
};
</script>
